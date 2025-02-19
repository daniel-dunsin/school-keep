import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Document } from 'src/api/documents/schemas/document.schema';
import { Student } from 'src/api/student/schemas/student.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { SchoolClearance } from './school-clearance.schema';
import { StudentClearanceStatus } from '../enums';

@DBSchema()
export class StudentClearance extends TimestampMixin {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Student.name,
  })
  student: Student;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchoolClearance.name,
  })
  clearance: SchoolClearance;

  @Prop({
    type: String,
    enum: Object.values(StudentClearanceStatus),
    default: StudentClearanceStatus.Requested,
  })
  status: StudentClearanceStatus;

  @Prop()
  approvalDate: Date;

  @Prop()
  approvalSignature: string;

  @Prop()
  rejectionReason: string;

  @Prop()
  rejectionDate: Date;

  @Prop()
  lastRequestDate: Date;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Document.name,
      },
    ],
  })
  documents: Document[];
}

export type StudentClearanceDocument = HydratedDocument<StudentClearance>;
export const StudentClearanceSchema =
  SchemaFactory.createForClass(StudentClearance);
