import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';

@DBSchema()
export class School extends TimestampMixin {
  @Prop()
  name: string;

  @Prop()
  logo: string;

  @Prop()
  acronym: string;

  @Prop()
  motto: string;

  @Prop()
  webUrl: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  manager: UserDocument;
}

export type SchoolDocument = HydratedDocument<School>;
export const SchoolSchema = SchemaFactory.createForClass(School);
