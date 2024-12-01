import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { FilterQuery, Model, PipelineStage, Types } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateStudentDto, GetStudentsDto } from './dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Auth, AuthDocument } from '../auth/schemas/auth.schema';
import { Roles } from '../user/enums';
import { UtilsService } from 'src/shared/services/util.service';
import { EmailService } from 'src/shared/modules/mail/mail.service';
import { StudentStatus } from './enums';
import { DocumentService } from '../documents/document.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,

    private readonly authService: AuthService,
    private readonly utilService: UtilsService,
    private readonly emailService: EmailService,
    private readonly documentService: DocumentService,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto, schoolId: string) {
    await this.authService.validateStudentSignUpPayload({
      ...createStudentDto,
      school: schoolId,
    });

    const {
      email,
      phoneNumber,
      firstName,
      lastName,
      department,
      matricNumber,
    } = createStudentDto;

    let user = await this.userModel.create({
      email,
      phoneNumber,
      firstName,
      lastName,
      role: Roles.Student,
      school: new Types.ObjectId(schoolId),
    });

    user = await user.populate('school', 'name');

    const password = this.utilService.generateRandomValues(8, false);

    const hashedPassword = await this.utilService.hashPassword(password);

    await this.authModel.create({
      user: user._id,
      password: hashedPassword,
    });

    const student = await this.studentModel
      .create({
        user: user._id,
        matricNumber,
        department,
      })
      .then(async (student) => {
        user.student = student._id as any;
        await user.save();
        await this.documentService.initStudentFolders(student._id);
        return await student.populate('department', 'name');
      });

    await this.emailService.sendMail({
      to: email,
      subject: 'Student account created 🏫',
      template: 'student-added',
      context: {
        department: student?.department?.name,
        firstName,
        school: user?.school?.name,
        email,
        password,
      },
    });

    return {
      message: 'Student added',
      success: true,
    };
  }

  async getAllStudents(query: GetStudentsDto, schoolId: string) {
    let pipelines: PipelineStage[] = [
      {
        $lookup: {
          from: 'users',
          as: 'user',
          localField: 'user',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                admin: 0,
                role: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'departments',
          as: 'department',
          localField: 'department',
          foreignField: '_id',
          pipeline: [
            {
              $lookup: {
                from: 'colleges',
                as: 'college',
                localField: 'college',
                foreignField: '_id',
              },
            },
            {
              $unwind: {
                path: '$college',
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$department',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const _query: FilterQuery<StudentDocument> = {
      'user.school': new Types.ObjectId(schoolId),
    };

    if (query.college_id) {
      _query['department.college._id'] = new Types.ObjectId(query?.college_id);
      delete query?.college_id;
    }

    if (query.department_id) {
      _query['department._id'] = new Types.ObjectId(query?.department_id);
      delete query?.department_id;
    }

    if (query.search) {
      pipelines = [
        ...pipelines,
        {
          $addFields: {
            'user.fullName': {
              $concat: ['$user.firstName', ' ', '$user.lastName'],
            },
            'user.fullNameReversed': {
              $concat: ['$user.lastName', ' ', '$user.firstName'],
            },
          },
        },
      ];

      const searchRegex = { $regex: new RegExp(query?.search, 'i') };

      _query['$or'] = [
        { 'department.name': searchRegex },
        { 'department.unionName': searchRegex },
        { 'department.college.name': searchRegex },
        { 'department.college.unionName': searchRegex },
        { 'user.fullName': searchRegex },
        { 'user.fullNameReversed': searchRegex },
        { 'user.email': searchRegex },
        { 'user.phoneNumber': searchRegex },
        { matricNumber: searchRegex },
      ];

      delete query?.search;
    }

    const data = await this.studentModel.aggregate([
      ...pipelines,
      {
        $match: _query,
      },
      {
        $project: {
          _id: 1,
          matricNumber: 1,
          user: {
            firstName: 1,
            lastName: 1,
            profilePicture: 1,
            email: 1,
            phoneNumber: 1,
            _id: 1,
          },
          department: {
            name: 1,
            logo: 1,
            unionName: 1,
            _id: 1,
            college: {
              name: 1,
              logo: 1,
              unionName: 1,
              _id: 1,
            },
          },
        },
      },
    ]);

    return {
      message: 'Students fetched successfully',
      data,
      success: true,
    };
  }

  async getStudent(student_id: string) {
    const data = await this.studentModel
      .findById(student_id)
      .populate('user')
      .populate({
        path: 'department',
        select: 'name logo unionName college',
        populate: {
          path: 'college',
          select: 'name logo unionName',
        },
      });

    if (!data) throw new NotFoundException('Oops! this student does not exist');

    return {
      success: true,
      message: 'Student retrieved successfully',
      data,
    };
  }

  async updateStudentStatus(student_id: string, status: StudentStatus) {
    const student = await this.studentModel
      .findById(student_id)
      .populate('user', 'firstName email');

    if (!student)
      throw new NotFoundException('Oops! this student does not exist');

    student.status = status;
    await student.save();

    let emailStatus;

    switch (status) {
      case StudentStatus.Active:
        emailStatus = 'Reactivated';
        break;
      case StudentStatus.Expelled:
        emailStatus = 'Expelled';
        break;
      case StudentStatus.Suspended:
        emailStatus = 'Suspended';
        break;
      case StudentStatus.Cleared:
        break;
    }

    if (emailStatus) {
      await this.emailService.sendMail({
        to: student.user.email,
        subject: 'School Keep: Account Update',
        template: 'student-status-update',
        context: {
          status: emailStatus,
          firstName: student.user.firstName,
        },
      });
    }

    return {
      message: 'Student updated',
    };
  }
}
