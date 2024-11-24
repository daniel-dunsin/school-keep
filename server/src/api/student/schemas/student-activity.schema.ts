import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { Student, StudentDocument } from './student.schema';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import { StudentActivityType } from '../enums';
import {
  Document,
  DocumentMongooseDocument,
} from 'src/api/documents/schemas/document.schema';

@DBSchema()
export class StudentActivity extends TimestampMixin {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Student.name,
  })
  student: StudentDocument;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Document.name,
      },
    ],
    default: [],
  })
  documents: DocumentMongooseDocument[];

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  actor: UserDocument;

  @Prop({
    type: String,
    enum: Object.values(StudentActivityType),
    default: StudentActivityType.Normal,
  })
  activityType: StudentActivityType;

  @Prop()
  content?: string;
}

export type StudentActivityDocument = HydratedDocument<StudentActivity>;

export const StudentActivitySchema =
  SchemaFactory.createForClass(StudentActivity);
