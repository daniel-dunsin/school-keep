import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { LoginDto, StudentSignUpDto } from './dtos';
import { UtilsService } from 'src/shared/services/util.service';
import { JwtService } from '@nestjs/jwt';
import { School, SchoolDocument } from '../school/schemas/school.schema';
import {
  Department,
  DepartmentDocument,
} from '../school/schemas/department.schema';
import { Student, StudentDocument } from '../student/schemas/student.schema';
import { FileService } from 'src/shared/services/file.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    private readonly fileService: FileService,
    private readonly utilService: UtilsService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateStudentSignUpPayload(signUpDto: StudentSignUpDto) {
    const { department, school: schoolId, email } = signUpDto;

    if (!(await this.departmentModel.findById(department))) {
      throw new NotFoundException(
        'Oops! the selected department does not exist',
      );
    }

    const school = await this.schoolModel.findById(schoolId);

    if (!school) {
      throw new NotFoundException('Oops! the selected school does not exist');
    }

    let domainName = new URL(school.webUrl).hostname;

    domainName = domainName.startsWith('www.')
      ? domainName.slice(4)
      : domainName;

    if (!email.includes(domainName)) {
      throw new BadRequestException(
        'Invalid school email address, use your student email address!',
      );
    }
  }

  async signJwtToken(user: UserDocument, remember_me: boolean = false) {
    const ONE_DAY = 24 * 60 * 60 * 1000;

    const token = await this.jwtService.signAsync(user, {
      expiresIn: remember_me ? 7 * ONE_DAY : ONE_DAY,
    });

    return token;
  }

  async login(loginDto: LoginDto) {
    loginDto.email = loginDto.email.toLowerCase();

    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .populate('admin student school');

    if (!user) {
      throw new NotFoundException('Invalid login credentials');
    }

    const auth = await this.authModel.findOne({ user: user._id });

    if (!auth)
      throw new NotFoundException(
        "Authentication credentials not found! We're fixing it...",
      );

    if (
      !(await this.utilService.comparePassword(
        loginDto.password,
        auth.password,
      ))
    ) {
      throw new BadRequestException('Invalid login credentials');
    }

    const accessToken = await this.signJwtToken(
      user.toObject(),
      loginDto.remember_me,
    );

    auth.accessToken = accessToken;
    await auth.save();

    return {
      success: true,
      message: 'login successful',
      data: user,
      meta: {
        accessToken,
      },
    };
  }

  async signUpStudent(signUpDto: StudentSignUpDto) {
    await this.validateStudentSignUpPayload(signUpDto);

    const {
      email,
      lastName,
      firstName,
      phoneNumber,
      profilePicture: profilePictureBase64,
      school,
      department,
      matricNumber,
      password,
    } = signUpDto;

    if (await this.userModel.findOne({ $or: [{ email }, { phoneNumber }] })) {
      throw new BadRequestException(
        'Oops! a student with this email address already exists',
      );
    }

    const hashedPassword = await this.utilService.hashPassword(password);

    let profilePicture = undefined;
    let profilePictureId = undefined;

    if (profilePictureBase64) {
      const { url, public_id } =
        await this.fileService.uploadResource(profilePicture);

      profilePicture = url;
      profilePictureId = public_id;
    }

    const user = await this.userModel.create({
      email,
      firstName,
      lastName,
      school: new Types.ObjectId(school),
      profilePicture,
      profilePictureId,
    });

    const accessToken = await this.signJwtToken(user, false);

    await this.authModel.create({
      user: user._id,
      passowrd: hashedPassword,
      accessToken,
    });

    await this.studentModel.create({
      user: user._id,
      matricNumber,
      department: new Types.ObjectId(department),
    });

    return {
      success: true,
      message: 'Account created successfully',
      data: user,
      meta: {
        accessToken,
      },
    };
  }
}
