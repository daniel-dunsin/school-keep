import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  CreateFolderDto,
  GetAllDocumentsQuery,
  MoveDocumentDto,
  UpdateDocumentDto,
} from './dtos';
import { Auth, IsPublic } from 'src/core/decorators/auth.decoractor';
import { Student } from '../student/schemas/student.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { MULTER_DISK_STORAGE } from 'src/shared/constants';
import { User } from '../user/schemas/user.schema';
import { MongoIdPipe } from 'src/core/pipes/mongo-id.pipe';
import { Response } from 'express';

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
  @ApiQuery({ name: 'studentId', required: false })
  async getFolders(
    @Auth('student') student: Student,
    @Query('studentId') studentId?: string,
  ) {
    return await this.documentService.getStudentFolders(
      student?._id || studentId,
    );
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
    if (file) {
      body.file = file;
    }

    return await this.documentService.updateDocument(body, reference, user._id);
  }

  @Get('folder/:folder_id/documents')
  async getFolderDocuments(
    @Param('folder_id', MongoIdPipe) folderId: string,
    @Auth() user: User,
  ) {
    return await this.documentService.getDocuments(
      { folder_id: folderId },
      user,
    );
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

  @Get()
  async getAllDocuments(
    @Query() query: GetAllDocumentsQuery,
    @Auth() user: User,
  ) {
    return await this.documentService.getDocuments(
      {
        ...query,
        school_id: user?.school?._id,
      },
      user,
    );
  }

  @Get('student/:student_id')
  async getStudentDocuments(
    @Query() query: GetAllDocumentsQuery,
    @Param('student_id', MongoIdPipe) student_id: string,
    @Auth() user: User,
  ) {
    return await this.documentService.getDocuments(
      { ...query, student_id },
      user,
    );
  }

  @IsPublic()
  @Get('download')
  async downloadFile(
    @Query('url') url: string,
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ) {
    return await this.documentService.downloadFile(res, { url, fileName });
  }

  @Get(':document_id')
  async getDocument(
    @Param('document_id', MongoIdPipe) documentId: string,
    @Auth() user?: User,
  ) {
    return await this.documentService.getDocument(documentId, user);
  }
}
