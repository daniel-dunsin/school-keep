import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { Clearance, ClearanceDocument } from './clearance.schema';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';

@DBSchema()
export class ClearanceActivity extends TimestampMixin {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Clearance.name,
  })
  clearance: ClearanceDocument;

  @Prop()
  content?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  actor: UserDocument;
}

export type ClearanceActivityDocument = HydratedDocument<ClearanceActivity>;
export const ClearanceActivitySchema =
  SchemaFactory.createForClass(ClearanceActivity);
