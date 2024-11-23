import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto, GetAdminsDto } from './dtos';
import { Auth } from 'src/core/decorators/auth.decoractor';
import { SchoolDocument } from '../school/schemas/school.schema';
import { MongoIdPipe } from 'src/core/pipes/mongo-id.pipe';

@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getAdmins(
    @Query() query: GetAdminsDto,
    @Auth('school') school: SchoolDocument,
  ) {
    return await this.adminService.getAllAdmins(query, school._id);
  }

  @Post()
  async createSubAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Auth('school') school: SchoolDocument,
  ) {
    return await this.adminService.createSubAdmin(createAdminDto, school._id);
  }

  @Delete(':adminId')
  async deleteAdmin(
    @Param('adminId', MongoIdPipe) adminId: string,
    @Auth('school') school: SchoolDocument,
  ) {
    return await this.adminService.deleteAdmin(adminId, school._id);
  }
}
