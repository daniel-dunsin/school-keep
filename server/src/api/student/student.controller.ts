import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
import { StudentStatus } from './enums';

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

  @Get(':student_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  async getStudent(@Param('student_id') studentId: string) {
    return await this.studentService.getStudent(studentId);
  }

  @Patch(':student_id/status')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(StudentStatus),
        },
      },
    },
  })
  async updateStudentStatus(
    @Param('student_id') studentId: string,
    @Body('status') status: StudentStatus,
  ) {
    return await this.studentService.updateStudentStatus(studentId, status);
  }
}
