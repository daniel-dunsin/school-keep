import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import {
  ConfirmForgotPasswordOtpDto,
  LoginDto,
  ResetPasswordDto,
  StudentSignUpDto,
} from './dtos';
import { UtilsService } from 'src/shared/services/util.service';
import { JwtService } from '@nestjs/jwt';
import { School, SchoolDocument } from '../school/schemas/school.schema';
import {
  Department,
  DepartmentDocument,
} from '../school/schemas/department.schema';
import { Student, StudentDocument } from '../student/schemas/student.schema';
import { FileService } from 'src/shared/services/file.service';
import { EmailService } from 'src/shared/modules/mail/mail.service';
import { Roles } from '../user/enums';
import { StudentStatus } from '../student/enums';
import { add, isAfter } from 'date-fns';

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
    private readonly emailService: EmailService,
  ) {}

  async validateJwtPayload(accessToken: string, userId: string) {
    const auth = await this.authModel.findOne({
      accessToken,
      user: new Types.ObjectId(userId),
    });

    if (!auth) throw new UnauthorizedException('Unauthorized!');

    const user = await this.userModel
      .findById(userId)
      .populate(
        'admin student school student.department admin.department school.manager admin.department.college student.department.college',
      );

    return user!;
  }

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
      .populate(
        'admin student school student.department admin.department school.manager',
      );

    if (!user) {
      throw new NotFoundException('Invalid login credentials');
    }

    if (
      user.role === Roles.Student &&
      (user.student.status === StudentStatus.Expelled ||
        user.student.status === StudentStatus.Suspended)
    ) {
      throw new BadRequestException(
        "Oops! you're not allowed to access your account, reach out to your admin",
      );
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
      email: email.toLowerCase(),
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

    process.nextTick(async () => {
      const student = await this.studentModel.create({
        user: user._id,
        matricNumber,
        department: new Types.ObjectId(department),
      });

      user.student = student._id as any;
      await user.save();
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

  async forgotPassword(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .populate('student', 'status');
    const auth = await this.authModel.findOne({ user: user?._id });

    if (!user || !auth) {
      throw new NotFoundException(
        'Oops! a user with this email does not exist',
      );
    }

    if (
      user.role === Roles.Student &&
      (user.student.status === StudentStatus.Expelled ||
        user.student.status === StudentStatus.Suspended)
    ) {
      throw new BadRequestException(
        "Oops! you're not allowed to access your account, reach out to your admin",
      );
    }

    const code = this.utilService.generateRandomValues(4, true);
    auth.passwordResetCode = code;
    auth.passwordResetCodeExpiresAt = add(new Date(), { minutes: 15 });
    await auth.save();

    await this.emailService.sendMail({
      to: email,
      subject: 'Password reset code',
      template: 'forgot-password',
      context: {
        firstName: user.firstName,
        code,
      },
    });
    console.log(code);

    return {
      message: 'Password otp request successfully',
      success: true,
    };
  }

  async confirmForgotPassowrdOtp(confirmOtpDto: ConfirmForgotPasswordOtpDto) {
    const { code, email } = confirmOtpDto;

    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    const auth = await this.authModel.findOne({ user: user?._id });

    if (!user || !auth) {
      throw new NotFoundException(
        'Oops! a user with this email does not exist',
      );
    }

    if (
      !auth.passwordResetCode ||
      !auth.passwordResetCodeExpiresAt ||
      auth.passwordResetCode != code
    ) {
      throw new ConflictException('Oops! password reset code is invalid');
    }

    if (isAfter(new Date(), auth.passwordResetCodeExpiresAt)) {
      throw new BadRequestException('Oops! password reset code has expired');
    }

    const tempToken = await this.jwtService.signAsync(auth.toObject());

    auth.passwordResetTempToken = tempToken;
    await auth.save();

    return {
      message: 'Password Otp Confirmed',
      data: {
        tempToken,
      },
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { tempToken, password } = resetPasswordDto;

    const auth = await this.authModel.findOne({
      passwordResetTempToken: tempToken,
    });

    if (!auth)
      throw new BadRequestException('password reset session is invalid');

    const hashedPassword = await this.utilService.hashPassword(password);

    await this.authModel.findByIdAndUpdate(auth._id, {
      $set: { password: hashedPassword },
      $unset: {
        passwordResetCode: null,
        passwordResetTempToken: null,
        passwordResetCodeExpiresAt: null,
        accessToken: null,
      },
    });

    return {
      message: 'password reset successful',
    };
  }
}