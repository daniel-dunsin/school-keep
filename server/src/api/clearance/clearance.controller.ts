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
  ApproveStudentClearanceDto,
  GetClearanceQuery,
  RejectClearanceDto,
  RequestStudentClearanceDto,
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
import { User } from '../user/schemas/user.schema';

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

  @Post('/request')
  @RolesDec([Roles.Student])
  async requestClearance(@Auth() user: User) {
    return await this.clearanceService.requestClearance(
      user?.student?._id,
      user?._id,
    );
  }

  @Post('/reject/:clearance_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin, AdminRoles.Admin])
  async rejectClearance(
    @Param('clearance_id', MongoIdPipe) clearanceId: string,
    @Body() body: RejectClearanceDto,
    @Auth() user: User,
  ) {
    body.clearanceId = clearanceId;
    body.userId = user._id;

    return await this.clearanceService.rejectClearance(body);
  }

  @Post('/approve/:clearance_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin, AdminRoles.Admin])
  async approveClearance(
    @Param('clearance_id', MongoIdPipe) clearanceId: string,
    @Auth() user: User,
  ) {
    return await this.clearanceService.approveClearance(clearanceId, user._id);
  }

  @Get('/overview')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin, AdminRoles.Admin])
  async getClearanceOverview() {
    return await this.clearanceService.getClearanceOverview();
  }

  @Get('/school-clearance/:school_clearance_id/student/:student_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin, AdminRoles.Admin])
  async adminGetStudentSchoolClearance(
    @Param('school_clearance_id', MongoIdPipe) schoolClearanceId: string,
    @Param('student_id', MongoIdPipe) studentId: string,
  ) {
    return await this.clearanceService.getStudentSchoolClearance(
      schoolClearanceId,
      studentId,
    );
  }

  @Get('/school-clearance/:school_clearance_id/student')
  @RolesDec([Roles.Student])
  async getStudentSchoolClearance(
    @Param('school_clearance_id', MongoIdPipe) schoolClearanceId: string,
    @Auth('student') student: Student,
  ) {
    return await this.clearanceService.getStudentSchoolClearance(
      schoolClearanceId,
      student._id,
    );
  }

  @Post('/student-clearance/request')
  @RolesDec([Roles.Student])
  async requestStudentClearance(
    @Body() body: RequestStudentClearanceDto,
    @Auth() user: User,
  ) {
    return await this.clearanceService.requestStudentClearance(
      body,
      user?.student?._id,
      user?._id,
    );
  }

  @Post('/student-clearance/:student_clearance_id/reject')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin, AdminRoles.Admin])
  async rejectStudentClearance(
    @Param('student_clearance_id', MongoIdPipe) studentClearanceId: string,
    @Body() body: RejectClearanceDto,
    @Auth() user: User,
  ) {
    body.clearanceId = studentClearanceId;
    body.userId = user._id;
    return await this.clearanceService.rejectStudentClearance(body);
  }

  @Post('/student-clearance/:student_clearance_id/approve')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.SuperAdmin, AdminRoles.Admin])
  async approveStudentClearance(
    @Param('student_clearance_id', MongoIdPipe) studentClearanceId: string,
    @Auth() user: User,
    @Body() body: ApproveStudentClearanceDto,
  ) {
    body.clearanceId = studentClearanceId;
    body.userId = user._id;
    return await this.clearanceService.approveStudentClearance(body);
  }
}
