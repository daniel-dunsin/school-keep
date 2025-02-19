import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AddClearanceDto,
  ApproveStudentClearanceDto,
  GetClearanceQuery,
  RejectClearanceDto,
  RequestStudentClearanceDto,
} from './dtos';
import { Model, PopulateOptions, Types } from 'mongoose';
import { SchoolClearance } from './schemas/school-clearance.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClearanceStatus,
  RequestClearanceStatus,
  SchoolClearanceStatus,
  StudentClearanceStatus,
} from './enums';
import { Department } from '../school/schemas/department.schema';
import { Student } from '../student/schemas/student.schema';
import { Folder, FolderDocument } from '../documents/schemas/folders.schema';
import { Clearance } from './schemas/clearance.schema';
import { ClearanceActivity } from './schemas/clearance-activity.schema';
import { StudentClearance } from './schemas/student-clearance.schema';
import { User } from '../user/schemas/user.schema';
import { FileService } from 'src/shared/services/file.service';

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
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Folder.name)
    private readonly folderModel: Model<FolderDocument>,

    private readonly fileService: FileService,
  ) {}

  private async trackActivity(data: {
    clearance: string;
    user: string;
    content: string;
  }) {
    return await this.clearanceActivityModel.create({
      clearance: new Types.ObjectId(data?.clearance),
      actor: new Types.ObjectId(data?.user),
      content: data?.content,
    });
  }

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

    const studentClearance = await this.clearanceModel.findOne({
      student: new Types.ObjectId(studentId),
    });

    if (!studentClearance) {
      const totalRequiredFolders = await this.folderModel
        .find({
          isCustom: false,
          level: { $ne: null },
          student: new Types.ObjectId(studentId),
        })
        .countDocuments();

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

      if (
        !foldersWithDocuments ||
        foldersWithDocuments < totalRequiredFolders
      ) {
        return {
          success: true,
          data: {
            message:
              'You can not request clearance until you have at least a document in all levels folder.',
            status: RequestClearanceStatus.CAN_NOT_REQUEST,
          },
        };
      }

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
      .select('actor content createdAt _id')
      .populate({
        path: 'actor',
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
          message: 'You have requested clearance, wait for approval',
          status: RequestClearanceStatus.REQUESTED,
          lastRequestedDate: studentClearance.lastRequestedDate,
          clearanceId: studentClearance._id,
          activities,
        },
      };
    }

    if (studentClearance.status === ClearanceStatus.Rejected) {
      return {
        success: true,
        data: {
          message: 'Your clearance request has been rejected 😢',
          status: RequestClearanceStatus.REJECTED,
          rejectionReason: studentClearance.rejectionReason,
          rejectionDate: studentClearance.rejectionDate,
          clearanceId: studentClearance._id,
          activities,
        },
      };
    }

    if (studentClearance.status === ClearanceStatus.Completed) {
      return {
        success: true,
        data: {
          message: 'Clearance Complete 🎉',
          status: RequestClearanceStatus.COMPLETED,
          clearanceId: studentClearance._id,
          activities,
          completionDate: studentClearance.completionDate,
        },
      };
    }

    if (studentClearance.status === ClearanceStatus.Approved) {
      const submittedClearance = await this.studentClearanceModel
        .find({
          student: student._id,
        })
        .populate('clearance', '-school -status -updatedAt')
        .select('-student');

      const requiredClearanceIds = await this.departmentModel
        .findById(student.department)
        .populate('required_clearance')
        .then((d) => {
          if (d) {
            return d.required_clearance
              .filter((c) => c.status !== SchoolClearanceStatus.Deleted)
              .map((c) => c._id);
          } else {
            return [];
          }
        });

      const allClearance = await this.schoolClearanceModel
        .find({
          school: student?.user?.school,
          status: { $ne: SchoolClearanceStatus.Deleted },
        })
        .select('-school');

      return {
        success: true,
        data: {
          message: 'Clearance in progress',
          status: RequestClearanceStatus.IN_PROGRESS,
          clearanceId: studentClearance._id,
          activities,
          approvalDate: studentClearance.approvalDate,
          clearanceDetails: {
            all: allClearance,
            requiredIds: requiredClearanceIds,
            submitted: submittedClearance,
          },
        },
      };
    }
  }

  async requestClearance(studentId: string, studentUserId: string) {
    let clearance = await this.clearanceModel.findOne({
      student: new Types.ObjectId(studentId),
    });

    if (clearance && clearance.status != ClearanceStatus.Rejected) {
      throw new BadRequestException(
        'Snap! you can not request clearance at this time',
      );
    }

    clearance = await this.clearanceModel.findOneAndUpdate(
      { student: new Types.ObjectId(studentId) },
      {
        status: ClearanceStatus.Requested,
        lastRequestedDate: new Date(),
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );

    await this.trackActivity({
      clearance: clearance._id,
      user: studentUserId,
      content: 'sent clearance request',
    });

    return {
      message: 'Clearance requested',
      success: true,
    };
  }

  async rejectClearance(body: RejectClearanceDto) {
    const clearance = await this.clearanceModel.findById(body.clearanceId);

    if (!clearance) throw new NotFoundException('clearance request not found');
    if (clearance.status != ClearanceStatus.Requested)
      throw new NotFoundException(
        'Snap! only pending clearance requests can be rejected',
      );

    clearance.status = ClearanceStatus.Rejected;
    clearance.rejectionDate = new Date();
    clearance.rejectionReason = body.rejectionReason;
    await clearance.save();

    await this.trackActivity({
      clearance: clearance._id,
      user: body.userId,
      content: `rejected clearance request.\nReason: ${body.rejectionReason}`,
    });

    return {
      message: 'Clearance rejected',
      success: true,
    };
  }

  async approveClearance(clearanceId: string, userId: string) {
    const clearance = await this.clearanceModel.findById(clearanceId);

    if (!clearance) throw new NotFoundException('clearance request not found');
    if (clearance.status != ClearanceStatus.Requested)
      throw new NotFoundException(
        'Snap! only pending clearance requests can be approved',
      );

    clearance.status = ClearanceStatus.Approved;
    clearance.approvalDate = new Date();
    clearance.rejectionDate = null;
    clearance.rejectionReason = '';
    clearance.lastRequestedDate = null;
    await clearance.save();

    await this.trackActivity({
      clearance: clearance._id,
      user: userId,
      content: 'approved clearance request',
    });

    return {
      message: 'Clearance approved',
      success: true,
    };
  }

  async getClearanceOverview() {
    const populateOptions: PopulateOptions[] = [
      {
        path: 'student',
        select: 'user matricNumber _id',
        populate: {
          path: 'user',
          select: '_id firstName lastName profilePicture email phoneNumber',
        },
      },
    ];

    const [requested, rejected, approved, completed] = await Promise.all([
      this.clearanceModel
        .find({ status: ClearanceStatus.Requested })
        .populate(populateOptions),
      this.clearanceModel
        .find({ status: ClearanceStatus.Rejected })
        .populate(populateOptions),
      this.clearanceModel
        .find({ status: ClearanceStatus.Approved })
        .populate(populateOptions),
      this.clearanceModel
        .find({ status: ClearanceStatus.Completed })
        .populate(populateOptions),
    ]);

    return {
      message: "Students' clearance fetched",
      success: true,
      data: {
        requested,
        rejected,
        approved,
        completed,
      },
    };
  }

  async getStudentSchoolClearance(
    schoolClearanceId: string,
    studentId: string,
  ) {
    const schoolClearance = await this.schoolClearanceModel
      .findOne({
        _id: new Types.ObjectId(schoolClearanceId),
      })
      .select('-updatedAt -status -school');

    if (!schoolClearance)
      throw new NotFoundException('School clearance not found');

    const studentClearance = await this.studentClearanceModel
      .findOne({
        student: new Types.ObjectId(studentId),
        clearance: schoolClearance._id,
      })
      .select('-student -clearance -createdAt -updatedAt')
      .populate({
        path: 'documents',
        select: '-student -createdAt -updatedAt -publicId -uploadedBy',
        populate: {
          path: 'folder',
          select: '-student -createdAt -updatedAt',
        },
      });

    return {
      message: 'School clearance fetched',
      success: true,
      data: {
        schoolClearance,
        studentClearance,
      },
    };
  }

  async requestStudentClearance(
    body: RequestStudentClearanceDto,
    studentId: string,
    studentUserId: string,
  ) {
    const studentMainClearance = await this.clearanceModel.findOne({
      student: new Types.ObjectId(studentId),
    });

    if (!studentMainClearance) {
      throw new NotFoundException('Student clearance not found');
    }

    const studentClearance = await this.studentClearanceModel
      .findOne({
        student: new Types.ObjectId(studentId),
        clearance: new Types.ObjectId(body.schoolClearanceId),
      })
      .populate('clearance', 'clearance_name');

    if (studentClearance) {
      await this.studentClearanceModel.updateOne(
        { _id: studentClearance._id },
        {
          $set: {
            status: StudentClearanceStatus.Requested,
            documents: body.documents,
            lastRequestDate: new Date(),
          },
          $unset: {
            rejectionDate: '',
            rejectionReason: '',
          },
        },
        {
          runValidators: true,
        },
      );
    } else {
      await this.studentClearanceModel.create({
        student: new Types.ObjectId(studentId),
        clearance: new Types.ObjectId(body.schoolClearanceId),
        status: StudentClearanceStatus.Requested,
        documents: body.documents,
        lastRequestDate: new Date(),
      });
    }

    await this.trackActivity({
      clearance: studentMainClearance._id,
      user: studentUserId,
      content: `sent clearance request for ${studentClearance?.clearance?.clearance_name}`,
    });

    return {
      message: 'Student clearance requested',
      success: true,
    };
  }

  async rejectStudentClearance(body: RejectClearanceDto) {
    const studentClearance = await this.studentClearanceModel
      .findById(body.clearanceId)
      .populate('clearance', 'clearance_name');

    if (!studentClearance)
      throw new NotFoundException('Student clearance not found');

    const studentMainClearance = await this.clearanceModel.findOne({
      student: studentClearance.student,
    });

    if (!studentMainClearance)
      throw new NotFoundException('Student clearance not found');

    if (studentClearance.status !== StudentClearanceStatus.Requested)
      throw new BadRequestException(
        'Snap! only pending clearance requests can be rejected',
      );

    studentClearance.status = StudentClearanceStatus.Rejected;
    studentClearance.rejectionDate = new Date();
    studentClearance.rejectionReason = body.rejectionReason;
    await studentClearance.save();

    await this.trackActivity({
      clearance: studentMainClearance._id,
      user: body.userId,
      content: `rejected clearance request for ${studentClearance?.clearance?.clearance_name}`,
    });

    return {
      message: 'Student clearance rejected',
      success: true,
    };
  }

  async approveStudentClearance(body: ApproveStudentClearanceDto) {
    const user = await this.userModel.findById(body.userId);

    if (!user) throw new NotFoundException('User not found');

    if (!body.approvalSignature && !user.signature) {
      throw new NotFoundException(
        'You have no signature to approve this clearance request',
      );
    }

    if (body.approvalSignature) {
      const { url } = await this.fileService.uploadResource(
        body.approvalSignature,
        false,
      );

      body.approvalSignature = url;
    }

    const studentClearance = await this.studentClearanceModel
      .findById(body.clearanceId)
      .populate('clearance', 'clearance_name');

    if (!studentClearance)
      throw new NotFoundException('Student clearance not found');

    const studentMainClearance = await this.clearanceModel.findOne({
      student: studentClearance.student,
    });

    if (!studentMainClearance)
      throw new NotFoundException('Student clearance not found');

    if (studentClearance.status === StudentClearanceStatus.Approved)
      throw new BadRequestException(
        'Snap! this clearance request has already been approved',
      );

    studentClearance.status = StudentClearanceStatus.Approved;
    studentClearance.approvalDate = new Date();
    studentClearance.approvalSignature = body.approvalSignature;
    studentClearance.rejectionDate = null;
    studentClearance.rejectionReason = '';
    await studentClearance.save();

    if (body.setDefaultSignature && body.approvalSignature) {
      user.signature = body.approvalSignature;
      await user.save();
    }

    await this.trackActivity({
      clearance: studentMainClearance._id,
      user: body.userId,
      content: `approved clearance request for ${studentClearance?.clearance?.clearance_name}`,
    });

    return {
      message: 'Student clearance approved',
      success: true,
    };
  }
}
