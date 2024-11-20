import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School, SchoolDocument } from './schemas/school.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { College, CollegeDocument } from './schemas/college.schema';
import { CreateCollegeDto } from './dtos/college.dto';
import { isEmpty } from 'lodash';
import { FileService } from 'src/shared/services/file.service';
import { CreateDepartmentDto, GetCollegesQuery } from './dtos/department.dto';

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

  async getColleges(query: GetCollegesQuery, schoolId: string) {
    const _query: FilterQuery<CollegeDocument> = {
      school: new Types.ObjectId(schoolId),
    };

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
}
