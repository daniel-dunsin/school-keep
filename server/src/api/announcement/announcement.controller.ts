import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import {
  AdminRolesDec,
  Auth,
  RolesDec,
} from 'src/core/decorators/auth.decoractor';
import { Roles } from '../user/enums';
import { AdminRoles } from '../admin/enums';
import {
  CreateAnnouncementDto,
  GetAnnouncementsQuery,
  UpdateAnnouncementDto,
} from './dtos';
import { SchoolDocument } from '../school/schemas/school.schema';
import { AdminDocument } from '../admin/schemas/admin.schema';
import { StudentDocument } from '../student/schemas/student.schema';
import { MongoIdPipe } from 'src/core/pipes/mongo-id.pipe';

@Controller('announcement')
@ApiTags('announcement')
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

  @Put(':announcement_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  async updateAnnouncement(
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    @Param('announcement_id', MongoIdPipe) announcement_id: string,
  ) {
    return await this.announcementService.updateAnnouncement(
      announcement_id,
      updateAnnouncementDto,
    );
  }

  @Delete(':announcement_id')
  @RolesDec([Roles.Admin])
  @AdminRolesDec([AdminRoles.Admin, AdminRoles.SuperAdmin])
  async deleteAnnouncement(
    @Param('announcement_id', MongoIdPipe) announcement_id: string,
  ) {
    return await this.announcementService.deleteAnnouncement(announcement_id);
  }
}
