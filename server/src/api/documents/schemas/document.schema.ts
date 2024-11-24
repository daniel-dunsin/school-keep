import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  Student,
  StudentDocument,
} from 'src/api/student/schemas/student.schema';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { Folder, FolderDocument } from './folders.schema';

@DBSchema()
export class Document extends TimestampMixin {
  @Prop({ default: 1 })
  version: number;

  @Prop({ required: true })
  reference: string;

  @Prop()
  mediaType: string;

  @Prop()
  url: string;

  @Prop()
  publicId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Student.name,
  })
  student: StudentDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  uploadedBy: UserDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Folder.name,
  })
  folder: FolderDocument;
}

export type DocumentMongooseDocument = HydratedDocument<Document>;
export const DocumentSchema = SchemaFactory.createForClass(Document);
