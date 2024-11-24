import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  Student,
  StudentDocument,
} from 'src/api/student/schemas/student.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';

@DBSchema()
export class Folder extends TimestampMixin {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Student.name,
  })
  student: StudentDocument;

  @Prop({ type: Number })
  level: number;

  @Prop({ type: String })
  folderName: string;

  @Prop({ default: false })
  isCustom: boolean;
}

export type FolderDocument = HydratedDocument<Folder>;

export const FolderSchema = SchemaFactory.createForClass(Folder);
