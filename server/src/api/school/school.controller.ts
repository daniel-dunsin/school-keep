import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateCollegeDto,
  GetCollegesQuery,
  UpdateCollegeDto,
} from './dtos/college.dto';
import {
  AdminRolesDec,
  Auth,
  IsPublic,
  RolesDec,
} from 'src/core/decorators/auth.decoractor';
import { SchoolDocument } from './schemas/school.schema';
import { Roles } from '../user/enums';
import { AdminRoles } from '../admin/enums';
import { SchoolService } from './school.service';
import { DepartmentDto } from './dtos/department.dto';
import { MongoIdPipe } from 'src/core/pipes/mongo-id.pipe';

@Controller('school')
@ApiTags('school')
@ApiBearerAuth()
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('college')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async createCollege(
    @Body() createCollegeDto: CreateCollegeDto,
    @Auth('school') school: SchoolDocument,
  ) {
    createCollegeDto.schoolId = school._id;

    const data = await this.schoolService.createColleges(createCollegeDto);

    return data;
  }

  @Post('college/:college_id/department')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async createDepartments(
    @Body() createDepartmentsDto: DepartmentDto,
    @Auth('school') school: SchoolDocument,
    @Param('college_id', MongoIdPipe) collegeId: string,
  ) {
    const data = await this.schoolService.createDepartments({
      departments: [createDepartmentsDto],
      schoolId: school._id,
      collegeId: collegeId,
    });

    return data;
  }

  @Get('college')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async getColleges(
    @Query() query: GetCollegesQuery,
    @Auth('school') school: SchoolDocument,
  ) {
    query.school_id = school._id;
    const data = await this.schoolService.getColleges(query);

    return data;
  }

  @Get('college/:college_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async getCollege(@Param('college_id', MongoIdPipe) collegeId: string) {
    const data = await this.schoolService.getCollege(collegeId);

    return data;
  }

  @Get('college/:college_id/department')
  @IsPublic()
  async getCollegeDepartments(
    @Param('college_id', MongoIdPipe) collegeId: string,
  ) {
    return await this.schoolService.getCollegeDepartments(collegeId);
  }

  @Put('college/:college_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async updateCollege(
    @Param('college_id', MongoIdPipe) collegeId: string,
    @Body() updateCollegeDto: UpdateCollegeDto,
  ) {
    return await this.schoolService.updateCollege(updateCollegeDto, collegeId);
  }

  @Get()
  @IsPublic()
  async getSchools() {
    return await this.schoolService.getSchools();
  }

  @Get(':school_id/college')
  @IsPublic()
  async getSchoolColleges(@Param('school_id', MongoIdPipe) schoolId: string) {
    return await this.schoolService.getColleges({ school_id: schoolId });
  }

  @Get('department/:department_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async getDepartment(
    @Param('department_id', MongoIdPipe) departmentId: string,
  ) {
    return await this.schoolService.getDepartment(departmentId);
  }
}
