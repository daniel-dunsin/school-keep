import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { CreateFolderDto } from './dtos';
import { Auth } from 'src/core/decorators/auth.decoractor';
import { Student } from '../student/schemas/student.schema';

@Controller('document')
@ApiTags('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('folder')
  async createFolder(
    @Body() body: CreateFolderDto,
    @Auth('student') student: Student,
  ) {
    return await this.documentService.createFolder(body, student._id);
  }

  @Get('folder')
  async getFolders(@Auth('student') student: Student) {
    return await this.documentService.getStudentFolders(student._id);
  }

  @Delete('folder/:folder_id')
  async deleteFolder(@Param('folder_id') folderId: string) {
    return await this.documentService.deleteFolder(folderId);
  }

  @Put('folder/:folder_id')
  async updateFolder(
    @Param('folder_id') folderId: string,
    @Body() body: CreateFolderDto,
  ) {
    return await this.documentService.updateFolder(body, folderId);
  }
}
