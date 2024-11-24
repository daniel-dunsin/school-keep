import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schemas/document.schema';
import { Folder, FolderSchema } from './schemas/folders.schema';

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
  ],
  exports: [MongooseModule],
})
export class DocumentModule {}
