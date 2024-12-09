import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddClearanceDto, GetClearanceQuery } from './dtos';
import { Model, Types } from 'mongoose';
import { SchoolClearance } from './schemas/school-clearance.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SchoolClearanceStatus } from './enums';
import { Department } from '../school/schemas/department.schema';

@Injectable()
export class ClearanceService {
  constructor(
    @InjectModel(SchoolClearance.name)
    private readonly schoolClearanceModel: Model<SchoolClearance>,

    @InjectModel(Department.name)
    private readonly departmentModel: Model<Department>,
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
}
