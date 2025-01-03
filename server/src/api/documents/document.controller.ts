import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  CreateFolderDto,
  MoveDocumentDto,
  UpdateDocumentDto,
} from './dtos';
import { Auth } from 'src/core/decorators/auth.decoractor';
import { Student } from '../student/schemas/student.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { MULTER_DISK_STORAGE } from 'src/shared/constants';
import { User } from '../user/schemas/user.schema';
import { MongoIdPipe } from 'src/core/pipes/mongo-id.pipe';

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

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: MULTER_DISK_STORAGE }))
  async createDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateDocumentDto,
    @Auth() user: User,
  ) {
    body.file = file;

    return await this.documentService.createDocument(
      body,
      user._id,
      user?.student?._id,
    );
  }

  @Put(':document_reference')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: MULTER_DISK_STORAGE }))
  async updateDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateDocumentDto,
    @Auth() user: User,
    @Param('document_reference') reference: string,
  ) {
    if (body.file) {
      body.file = file;
    }

    return await this.documentService.updateDocument(body, reference, user._id);
  }

  @Get('folder/:folder_id/documents')
  async getFolderDocuments(@Param('folder_id', MongoIdPipe) folderId: string) {
    return await this.documentService.getDocuments({ folder_id: folderId });
  }

  @Get(':document_id')
  async getDocument(@Param('document_id', MongoIdPipe) documentId: string) {
    return await this.documentService.getDocument(documentId);
  }

  @Delete(':document_id')
  async deleteDocument(@Param('document_id', MongoIdPipe) documentId: string) {
    return await this.documentService.deleteDocument(documentId);
  }

  @Post(':document_id/move')
  async moveDocumentFolder(
    @Param('document_id', MongoIdPipe) documentId: string,
    @Body() moveDocumentDto: MoveDocumentDto,
  ) {
    return await this.documentService.moveDocumentFolder(
      documentId,
      moveDocumentDto.folder_id,
    );
  }
}
