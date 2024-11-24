import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import {
  AdminRolesDec,
  Auth,
  RolesDec,
} from 'src/core/decorators/auth.decoractor';
import { Roles } from '../user/enums';
import { AdminRoles } from '../admin/enums';
import { CreateStudentDto, GetStudentsDto } from './dto';
import { SchoolDocument } from '../school/schemas/school.schema';

@Controller('student')
@ApiTags('student')
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @Auth('school') school: SchoolDocument,
  ) {
    return await this.studentService.createStudent(
      createStudentDto,
      school._id,
    );
  }

  @Get()
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  async getAllStudents(
    @Query() query: GetStudentsDto,
    @Auth('school') school: SchoolDocument,
  ) {
    return await this.studentService.getAllStudents(query, school._id);
  }
}
