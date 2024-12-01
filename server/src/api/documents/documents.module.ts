import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schemas/document.schema';
import { Folder, FolderSchema } from './schemas/folders.schema';
import { SchoolModule } from '../school/school.module';
import { StudentModule } from '../student/student.module';
import { DocumentService } from './document.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Document.name,
        schema: DocumentSchema,
      },
      {
        name: Folder.name,
        schema: FolderSchema,
      },
    ]),
    forwardRef(() => SchoolModule),
    forwardRef(() => StudentModule),
  ],
  providers: [DocumentService],
  exports: [MongooseModule, DocumentService],
})
export class DocumentModule {}
