import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { Channels, PayDirection, PaymentReason, PaymentStatus } from '../enums';
import {
  Student,
  StudentDocument,
} from 'src/api/student/schemas/student.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import { School, SchoolDocument } from 'src/api/school/schemas/school.schema';

@DBSchema()
export class Transaction extends TimestampMixin {
  @Prop()
  transaction_reference: string;

  @Prop()
  direction: PayDirection;

  @Prop()
  amount: number;

  @Prop({})
  payment_channel: Channels;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Student.name,
  })
  student: StudentDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: School.name,
  })
  school: SchoolDocument;

  @Prop({
    type: String,
    enum: Object.values(PaymentReason),
  })
  payment_for: PaymentReason;

  @Prop({
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Prop({
    type: {
      school_clearance_id: {
        type: String,
      },
      documents: [
        {
          type: String,
        },
      ],
    },
    required: false,
  })
  meta: {
    school_clearance_id: string;
    documents: string[];
  };
}

export type TransactionDocument = HydratedDocument<Transaction>;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
