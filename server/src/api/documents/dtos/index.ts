import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'src/core/decorators/validators.decorators';

export class CreateFolderDto {
  @IsString(false)
  folderName: string;
}

export class CreateDocumentDto {
  @ApiProperty()
  file: Express.Multer.File;

  @IsString(false)
  documentName: string;

  @IsMongoId(false)
  folder: string;

  @IsMongoId(true)
  studentId: string;
}

export class UpdateDocumentDto {
  file?: Express.Multer.File;

  @IsString(true)
  documentName: string;
}

export class MoveDocumentDto {
  @IsMongoId(false)
  folder_id: string;
}

export class GetAllDocumentsQuery {
  @IsString(true)
  search?: string;
  reference?: string;
  school_id?: string;
  folder_id?: string;
  student_id?: string;
}

export interface DownloadFileDto {
  url: string;
  fileName: string;
}
