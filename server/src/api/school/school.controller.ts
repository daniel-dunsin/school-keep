import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCollegeDto } from './dtos/college.dto';
import {
  AdminRolesDec,
  Auth,
  RolesDec,
} from 'src/core/decorators/auth.decoractor';
import { SchoolDocument } from './schemas/school.schema';
import { Roles } from '../user/enums';
import { AdminRoles } from '../admin/enums';
import { SchoolService } from './school.service';
import { CreateDepartmentDto, GetCollegesQuery } from './dtos/department.dto';
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
    @Body() createDepartmentsDto: CreateDepartmentDto,
    @Auth('school') school: SchoolDocument,
    @Param('college_id', MongoIdPipe) collegeId: string,
  ) {
    createDepartmentsDto.schoolId = school._id;
    createDepartmentsDto.collegeId = collegeId;
    const data =
      await this.schoolService.createDepartments(createDepartmentsDto);

    return data;
  }

  @Get('college')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async getColleges(
    @Query() query: GetCollegesQuery,
    @Auth('school') school: SchoolDocument,
  ) {
    const data = await this.schoolService.getColleges(query, school._id);

    return data;
  }
}
