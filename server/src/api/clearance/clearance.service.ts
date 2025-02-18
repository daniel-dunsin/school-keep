import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddClearanceDto, GetClearanceQuery } from './dtos';
import { Model, Types } from 'mongoose';
import { SchoolClearance } from './schemas/school-clearance.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClearanceStatus,
  RequestClearanceStatus,
  SchoolClearanceStatus,
} from './enums';
import { Department } from '../school/schemas/department.schema';
import { Student } from '../student/schemas/student.schema';
import { Folder, FolderDocument } from '../documents/schemas/folders.schema';
import { Clearance } from './schemas/clearance.schema';
import { ClearanceActivity } from './schemas/clearance-activity.schema';
import { StudentClearance } from './schemas/student-clearance.schema';

@Injectable()
export class ClearanceService {
  constructor(
    @InjectModel(SchoolClearance.name)
    private readonly schoolClearanceModel: Model<SchoolClearance>,
    @InjectModel(StudentClearance.name)
    private readonly studentClearanceModel: Model<StudentClearance>,
    @InjectModel(Clearance.name)
    private readonly clearanceModel: Model<Clearance>,
    @InjectModel(ClearanceActivity.name)
    private readonly clearanceActivityModel: Model<ClearanceActivity>,
    @InjectModel(Department.name)
    private readonly departmentModel: Model<Department>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
    @InjectModel(Folder.name)
    private readonly folderModel: Model<FolderDocument>,
  ) {}

  async addClearance(addClearanceDto: AddClearanceDto, schoolId: string) {
    if (addClearanceDto.payment_required && !addClearanceDto.fee)
      throw new BadRequestException(
        'add fee for clearance that require payment',
      );

    const data = await this.schoolClearanceModel.create({
      school: new Types.ObjectId(schoolId),
      ...addClearanceDto,
    });

    return {
      message: 'Clearance created',
      data,
      success: true,
    };
  }

  async getSchoolClearance(schoolId: string, query: GetClearanceQuery) {
    const data = await this.schoolClearanceModel.find({
      school: new Types.ObjectId(schoolId),
      status: { $ne: SchoolClearanceStatus.Deleted },
      ...(query.search
        ? {
            clearance_name: {
              $regex: new RegExp(query.search, 'i'),
            },
          }
        : {}),
    });

    return {
      message: 'Clearance fetched',
      data,
      success: true,
    };
  }

  async deleteClearance(clearance_id: string) {
    const data = await this.schoolClearanceModel.findByIdAndUpdate(
      clearance_id,
      { status: SchoolClearanceStatus.Deleted },
    );

    if (!data) throw new NotFoundException('Clearance not found');

    return {
      message: 'Clearance deleted',
      data,
      success: true,
    };
  }

  async getDepartmentsRequiredClearance(
    school_id: string,
    query: GetClearanceQuery,
  ) {
    const data = await this.departmentModel
      .find({
        school: new Types.ObjectId(school_id),
        ...(query.search
          ? {
              $or: [
                {
                  name: {
                    $regex: new RegExp(query.search, 'i'),
                  },
                },
                {
                  unionName: {
                    $regex: new RegExp(query.search, 'i'),
                  },
                },
              ],
            }
          : {}),
      })
      .select('_id name required_clearance unionName logo')
      .populate({
        path: 'required_clearance',
        select: '-school -createdAt -updatedAt',
        match: {
          status: {
            $ne: SchoolClearanceStatus.Deleted,
          },
        },
      });

    return {
      message: 'Departments fetched',
      data,
      success: true,
    };
  }

  async setDepartmentRequiredClearance(
    department_id: string,
    required_clearance: string[],
  ) {
    const data = await this.departmentModel.findByIdAndUpdate(department_id, {
      $set: {
        required_clearance,
      },
    });

    if (!data) throw new NotFoundException('Oops! department not found');

    return {
      message: 'clearance updated',
      data,
      success: true,
    };
  }

  async getStudentClearance(studentId: string) {
    const student = await this.studentModel
      .findById(studentId)
      .populate('user', 'school');

    const totalRequiredFolders = await this.folderModel.countDocuments({
      isCustom: false,
      level: { $ne: null },
      student: new Types.ObjectId(studentId),
    });

    const foldersWithDocuments = await this.folderModel
      .aggregate([
        {
          $match: {
            isCustom: false,
            level: { $ne: null },
            student: new Types.ObjectId(studentId),
          },
        },
        {
          $lookup: {
            from: 'documents',
            as: 'documents',
            localField: '_id',
            foreignField: 'folder',
          },
        },
        {
          $addFields: { totalDocuments: { $size: '$documents' } },
        },
        {
          $match: { totalDocuments: { $gt: 0 } },
        },
        {
          $count: 'count',
        },
      ])
      .then((r) => r?.[0]?.count);

    if (foldersWithDocuments < totalRequiredFolders) {
      return {
        success: true,
        data: {
          message:
            'You can not request clearance until you have at least a document in all levels folder.',
          status: RequestClearanceStatus.CAN_NOT_REQUEST,
        },
      };
    }

    const studentClearance = await this.clearanceModel.findOne({
      student: new Types.ObjectId(studentId),
    });

    if (!studentClearance) {
      return {
        success: true,
        data: {
          message:
            'You already have documents in all levels folder and can request clearance.',
          status: RequestClearanceStatus.CAN_REQUEST,
        },
      };
    }

    const activities = await this.clearanceActivityModel
      .find({
        clearance: studentClearance._id,
      })
      .select('user content')
      .populate({
        path: 'user',
        select: '_id firstName lastName profilePicture role admin',
        populate: [
          {
            path: 'admin',
            select: '-user',
            populate: {
              path: 'department',
              select: '-logoPublicId -school -college',
            },
          },
        ],
      });

    if (studentClearance.status === ClearanceStatus.Requested) {
      return {
        success: true,
        data: {
          message: 'Clearance requested',
          status: RequestClearanceStatus.REQUESTED,
          activities: activities,
        },
      };
    }

    if (studentClearance.status === ClearanceStatus.Rejected) {
      return {
        success: true,
        data: {
          message: 'Clearance Rejected 😢',
          status: RequestClearanceStatus.REJECTED,
          activities: activities,
        },
      };
    }

    if (studentClearance.status === ClearanceStatus.Completed) {
      return {
        success: true,
        data: {
          message: 'Clearance Complete 🎉',
          status: RequestClearanceStatus.COMPLETED,
          activities: activities,
        },
      };
    }

    if (studentClearance.status === ClearanceStatus.Approved) {
      const completedClearance = await this.studentClearanceModel
        .find({
          clearance: studentClearance._id,
          cleared: true,
        })
        .select('-clearance -student');

      const requiredClearanceIds = await this.departmentModel
        .findById(student.department)
        .then((d) => {
          if (d) {
            return d.required_clearance;
          } else {
            return [];
          }
        });

      const allClearance = await this.schoolClearanceModel
        .find({
          school: student?.user?.school,
        })
        .select('-school');

      return {
        success: true,
        data: {
          message: 'Clearance in progress',
          status: RequestClearanceStatus.IN_PROGRESS,
          activities,
          clearance: {
            all: allClearance,
            requiredIds: requiredClearanceIds,
            completedClearance,
          },
        },
      };
    }
  }
}
