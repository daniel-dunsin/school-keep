import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  Student,
  StudentDocument,
} from 'src/api/student/schemas/student.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { ClearanceStatus } from '../enums';

@DBSchema()
export class Clearance extends TimestampMixin {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Student.name,
  })
  student: StudentDocument;

  @Prop({
    type: String,
    enum: Object.values(ClearanceStatus),
    default: ClearanceStatus.Requested,
  })
  status: ClearanceStatus;

  @Prop()
  approvalDate: Date;

  @Prop()
  rejectionReason: string;

  @Prop()
  rejectionDate: Date;
}

export type ClearanceDocument = HydratedDocument<Clearance>;
export const ClearanceSchema = SchemaFactory.createForClass(Clearance);
