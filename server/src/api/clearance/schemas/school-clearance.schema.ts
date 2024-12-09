import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { School } from 'src/api/school/schemas/school.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { SchoolClearanceStatus } from '../enums';

@DBSchema()
export class SchoolClearance extends TimestampMixin {
  @Prop()
  clearance_name: string;

  @Prop()
  payment_required: boolean;

  @Prop()
  fee: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: School.name })
  school: School;

  @Prop({
    type: String,
    enum: Object.values(SchoolClearanceStatus),
    default: SchoolClearanceStatus.Active,
  })
  status: SchoolClearanceStatus;

  @Prop({ type: Boolean, default: false })
  is_default: boolean;

  @Prop({
    type: [String],
  })
  required_documents: string[];
}

export type SchoolClearanceDocument = HydratedDocument<SchoolClearance>;
export const SchoolClearanceSchema =
  SchemaFactory.createForClass(SchoolClearance);
