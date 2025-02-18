import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AddClearanceDto,
  GetClearanceQuery,
  SetDepartmentRequiredClearance,
} from './dtos';
import {
  AdminRolesDec,
  Auth,
  RolesDec,
} from 'src/core/decorators/auth.decoractor';
import { School } from '../school/schemas/school.schema';
import { ClearanceService } from './clearance.service';
import { Roles } from '../user/enums';
import { AdminRoles } from '../admin/enums';
import { MongoIdPipe } from 'src/core/pipes/mongo-id.pipe';
import { Student } from '../student/schemas/student.schema';

@Controller('clearance')
@ApiTags('clearance')
export class ClearanceController {
  constructor(private readonly clearanceService: ClearanceService) {}

  @Post('school')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async addClearance(
    @Body() addClearanceDto: AddClearanceDto,
    @Auth('school') school: School,
  ) {
    return await this.clearanceService.addClearance(
      addClearanceDto,
      school._id,
    );
  }

  @Get('school')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async getSchoolClearance(
    @Auth('school') school: School,
    @Query() query: GetClearanceQuery,
  ) {
    return await this.clearanceService.getSchoolClearance(school._id, query);
  }

  @Delete('school/:clearance_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async deleteClearance(
    @Param('clearance_id', MongoIdPipe) clearance_id: string,
  ) {
    return await this.clearanceService.deleteClearance(clearance_id);
  }

  @Get('departments/required-clearance')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async getDeparmentsRequiredClearance(
    @Auth('school') school: School,
    @Query() query: GetClearanceQuery,
  ) {
    return await this.clearanceService.getDepartmentsRequiredClearance(
      school._id,
      query,
    );
  }

  @Post('/departments/:department_id/required-clearance')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin])
  async SetDepartmentRequiredClearance(
    @Param('department_id', MongoIdPipe) departmentId: string,
    @Body() body: SetDepartmentRequiredClearance,
  ) {
    return await this.clearanceService.setDepartmentRequiredClearance(
      departmentId,
      body.required_clearance,
    );
  }

  @Get('/student')
  @RolesDec([Roles.Student])
  async getStudentClearance(@Auth('student') student: Student) {
    return await this.clearanceService.getStudentClearance(student._id);
  }

  @Get('/student/:student_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin, AdminRoles.Admin])
  async adminGetStudentClearance(
    @Param('student_id', MongoIdPipe) studentId: string,
  ) {
    return await this.clearanceService.getStudentClearance(studentId);
  }
}
