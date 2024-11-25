import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import {
  AdminRolesDec,
  Auth,
  RolesDec,
} from 'src/core/decorators/auth.decoractor';
import { Roles } from '../user/enums';
import { AdminRoles } from '../admin/enums';
import { CreateAnnouncementDto, GetAnnouncementsQuery } from './dtos';
import { SchoolDocument } from '../school/schemas/school.schema';
import { AdminDocument } from '../admin/schemas/admin.schema';
import { StudentDocument } from '../student/schemas/student.schema';

@Controller('announcment')
@ApiTags('announcment')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  async createAnnouncement(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @Auth('school') school: SchoolDocument,
  ) {
    return await this.announcementService.createAnnouncment(
      createAnnouncementDto,
      school._id,
    );
  }

  @Get()
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  async getAnnouncement(
    @Query() query: GetAnnouncementsQuery,
    @Auth('school') school: SchoolDocument,
    @Auth('admin') admin: AdminDocument,
  ) {
    return await this.announcementService.getAnnouncments(
      query,
      school._id,
      admin,
    );
  }

  @Get('student')
  @RolesDec([Roles.Student])
  async getStudentAnnouncements(
    @Query() query: GetAnnouncementsQuery,
    @Auth('student') student: StudentDocument,
    @Auth('school') school: SchoolDocument,
  ) {
    query.student_id = student._id;
    return await this.announcementService.getAnnouncments(query, school._id);
  }
}
