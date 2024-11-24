import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Connection, FilterQuery, Model, PipelineStage, Types } from 'mongoose';
import { UtilsService } from 'src/shared/services/util.service';
import { CreateAdminDto, GetAdminsDto } from './dtos';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Roles } from '../user/enums';
import { Auth, AuthDocument } from '../auth/schemas/auth.schema';
import { School, SchoolDocument } from '../school/schemas/school.schema';
import { EmailService } from 'src/shared/modules/mail/mail.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    @InjectConnection()
    private readonly connection: Connection,
    private readonly utilService: UtilsService,
    private readonly emailService: EmailService,
  ) {}

  async getAllAdmins(query: GetAdminsDto, schoolId: string, userId: string) {
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

    const _query: FilterQuery<AdminDocument> = {
      'user.school': new Types.ObjectId(schoolId),
      'user._id': { $ne: new Types.ObjectId(userId) },
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
      ];

      delete query?.search;
    }

    if (query.permission) {
      _query.permission = query.permission;
      delete query?.permission;
    }

    const data = await this.adminModel.aggregate([
      ...pipelines,
      {
        $match: _query,
      },
      {
        $project: {
          permission: 1,
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
            college: {
              name: 1,
              logo: 1,
              unionName: 1,
            },
          },
        },
      },
    ]);

    return {
      message: 'Admins fetched successfully',
      data,
      success: true,
    };
  }

  async createSubAdmin(createAdminDto: CreateAdminDto, schoolId: string) {
    const { email, firstName, lastName, phoneNumber, permission, department } =
      createAdminDto;

    if (await this.userModel.exists({ email }))
      throw new BadRequestException(
        "Oops! another user with this email address exists! ensure you are using this user's school registered email address",
      );

    let user = await this.userModel.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      role: Roles.Admin,
      school: new Types.ObjectId(schoolId),
    });

    user = await user.populate('school', 'name');

    const password = this.utilService.generateRandomValues(8, false);

    const hashedPassword = await this.utilService.hashPassword(password);

    await this.authModel.create({
      user: user._id,
      password: hashedPassword,
    });

    const admin = await this.adminModel
      .create({
        user: user._id,
        permission,
        department,
      })
      .then(async (admin) => {
        user.admin = admin._id as any;
        await user.save();
        return await admin.populate('department', 'name');
      });

    await this.emailService.sendMail({
      to: email,
      subject: 'Admin account created 🏫',
      template: 'admin-added',
      context: {
        department: admin?.department?.name,
        firstName,
        permission,
        school: user?.school?.name,
        email,
        password,
      },
    });

    return {
      message: 'Admin created successfully',
      success: true,
    };
  }

  async deleteAdmin(admin_id: string, schoolId: string) {
    const session = await this.connection.startSession();

    session.startTransaction();
    try {
      const school = await this.schoolModel.findById(schoolId);

      if (!school) throw new NotFoundException('School not found');

      if (String(school.manager) === admin_id) {
        throw new BadRequestException(
          'The account of the school manager cannot be deleted!',
        );
      }

      const data = await this.adminModel.findByIdAndDelete(admin_id, {
        session,
      });

      if (!data) throw new NotFoundException('Admin not found!');

      const user = await this.userModel.findByIdAndDelete(data.user, {
        session,
      });

      await this.authModel.deleteOne({ user: user._id }, { session });

      await session.commitTransaction();

      return {
        message: 'Admin deleted',
        success: true,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
