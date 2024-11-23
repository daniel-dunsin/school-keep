import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School, SchoolDocument } from './schemas/school.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { College, CollegeDocument } from './schemas/college.schema';
import {
  CreateCollegeDto,
  GetCollegesQuery,
  UpdateCollegeDto,
} from './dtos/college.dto';
import { isEmpty } from 'lodash';
import { FileService } from 'src/shared/services/file.service';
import { CreateDepartmentDto } from './dtos/department.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel(College.name)
    private readonly collegeModel: Model<CollegeDocument>,
    private readonly fileService: FileService,
  ) {}

  private async validateCollegesCreation(createCollegeDto: CreateCollegeDto) {
    const { colleges, schoolId } = createCollegeDto;

    const school = await this.schoolModel.findById(schoolId);

    if (!school) throw new NotFoundException('School not found');

    const existingColleges = await this.collegeModel
      .find({
        school: new Types.ObjectId(schoolId),
        $or: colleges.map((college) => ({
          $or: [
            {
              name: {
                $regex: new RegExp(`^${college.name}$`, 'i'),
              },
            },
            {
              unionName: {
                $regex: new RegExp(`^${college.unionName}$`, 'i'),
              },
            },
          ],
        })),
      })
      .select('name unionName');

    if (!isEmpty(existingColleges)) {
      throw new BadRequestException(
        `Colleges ${existingColleges.map((c) => `${c.name} (${c.unionName})`)} already exists`,
      );
    }
  }

  private async validateDepartmentsCreation(
    createDepartmentsDto: CreateDepartmentDto,
  ) {
    const { departments, schoolId, collegeId } = createDepartmentsDto;

    const college = await this.collegeModel.findById(collegeId);

    if (!college) throw new NotFoundException('College not found');
    if (String(college.school) != schoolId)
      throw new BadRequestException(
        'This college is not under your school, please reach out to support to resolve this conflict!',
      );

    const existingDepts = await this.departmentModel
      .find({
        school: new Types.ObjectId(schoolId),
        college: new Types.ObjectId(collegeId),
        $or: departments.map((dept) => ({
          $or: [
            {
              name: {
                $regex: new RegExp(`^${dept.name}$`, 'i'),
              },
            },
            {
              unionName: {
                $regex: new RegExp(`^${dept.unionName}$`, 'i'),
              },
            },
          ],
        })),
      })
      .select('name unionName');

    if (!isEmpty(existingDepts)) {
      throw new BadRequestException(
        `Departments ${existingDepts.map((d) => `${d.name} (${d.unionName})`)} already exists`,
      );
    }
  }

  async createColleges(createCollegesDto: CreateCollegeDto) {
    const { colleges, schoolId } = createCollegesDto;

    await this.validateCollegesCreation(createCollegesDto);

    const createCollegesQuery = await Promise.all(
      colleges.map(async (college) => {
        const { url, public_id } = await this.fileService.uploadResource(
          college.logo,
        );

        return {
          name: college.name,
          unionName: college.unionName,
          school: new Types.ObjectId(schoolId),
          logo: url,
          logoPublicId: public_id,
        };
      }),
    );

    const data = await this.collegeModel.create(createCollegesQuery);

    return {
      message: 'Colleges created successfully',
      succes: true,
      data,
    };
  }

  async createDepartments(createDepartmentsDto: CreateDepartmentDto) {
    const { departments, collegeId, schoolId } = createDepartmentsDto;

    await this.validateDepartmentsCreation(createDepartmentsDto);

    const createDepartmentsQuery = await Promise.all(
      departments.map(async (dept) => {
        const { url, public_id } = await this.fileService.uploadResource(
          dept.logo,
        );

        return {
          name: dept.name,
          unionName: dept.unionName,
          school: new Types.ObjectId(schoolId),
          logo: url,
          logoPublicId: public_id,
          college: new Types.ObjectId(collegeId),
          levelsCount: dept.levelsCount,
        };
      }),
    );

    const data = await this.departmentModel.create(createDepartmentsQuery);

    return {
      message: 'Departments created successfully',
      succes: true,
      data,
    };
  }

  async getColleges(query: GetCollegesQuery) {
    const _query: FilterQuery<CollegeDocument> = {};

    if (query?.school_id) {
      _query.school = new Types.ObjectId(query?.school_id);
      delete query?.school_id;
    }

    const totalColleges = await this.collegeModel.countDocuments(_query);
    const totalDepartments = await this.departmentModel.countDocuments(_query);

    if (query?.search) {
      _query.$or = [
        {
          name: new RegExp(query?.search, 'i'),
        },
        {
          unionName: new RegExp(query?.search, 'i'),
        },
      ];

      delete query?.search;
    }

    const data = await this.collegeModel.find(_query);

    return {
      success: true,
      message: 'colleges fetched successfully',
      data,
      meta: {
        totalColleges,
        totalDepartments,
      },
    };
  }

  async getCollege(collegeId: string) {
    const data = await this.collegeModel.findById(collegeId);

    if (!data) throw new NotFoundException('College not found');

    return {
      success: true,
      message: 'College details fetched',
      data,
    };
  }

  async getCollegeDepartments(collegeId: string) {
    const departments = await this.departmentModel.aggregate([
      {
        $match: {
          college: new Types.ObjectId(collegeId),
        },
      },
      {
        $lookup: {
          from: 'students',
          as: 'students',
          localField: '_id',
          foreignField: 'department',
        },
      },
      {
        $lookup: {
          from: 'admins',
          as: 'admins',
          localField: '_id',
          foreignField: 'department',
        },
      },
      {
        $addFields: {
          totalStudents: { $size: '$students' },
          totalAdmins: { $size: '$admins' },
        },
      },
      {
        $project: {
          admins: 0,
          students: 0,
        },
      },
    ]);

    return {
      message: 'Departments fetched successfully',
      data: departments,
      success: true,
    };
  }

  async updateCollege(updateCollegeDto: UpdateCollegeDto, collegeId: string) {
    const college = await this.collegeModel.findById(collegeId);

    if (!college) throw new NotFoundException('College not found');

    const logoPublicId = college.logoPublicId;

    if (updateCollegeDto.name) {
      if (
        await this.collegeModel.findOne({
          name: new RegExp(`^${updateCollegeDto.name}$`, 'i'),
          school: college.school,
          _id: { $ne: college._id },
        })
      ) {
        throw new ConflictException(
          'Oops! another college with this name already exists',
        );
      }
    }

    if (updateCollegeDto.unionName) {
      if (
        await this.collegeModel.findOne({
          unionName: new RegExp(`^${updateCollegeDto.unionName}$`, 'i'),
          school: college.school,
          _id: { $ne: college._id },
        })
      ) {
        throw new ConflictException(
          'Oops! another college with this acronym already exists',
        );
      }
    }

    if (updateCollegeDto.logo) {
      const { url, public_id } = await this.fileService.uploadResource(
        updateCollegeDto.logo,
      );

      updateCollegeDto.logo = url;
      updateCollegeDto.logoPublicId = public_id;

      if (logoPublicId) {
        await this.fileService.deleteResource(logoPublicId);
      }
    }

    const data = await this.collegeModel.findByIdAndUpdate(
      collegeId,
      updateCollegeDto,
      { runValidators: true, new: true },
    );

    return {
      message: 'College updated successfully',
      data,
      success: true,
    };
  }

  async getSchools() {
    const data = await this.schoolModel.find({}).sort({ name: 1 });

    return {
      message: 'Schools fetched successfully',
      data,
      success: true,
    };
  }
}
