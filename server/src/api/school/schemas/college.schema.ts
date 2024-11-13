import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { School, SchoolDocument } from './school.schema';

@DBSchema()
export class College extends TimestampMixin {
  @Prop()
  name: string;

  @Prop()
  unionName: string;

  @Prop()
  logo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: School.name,
  })
  school: SchoolDocument;
}

export type CollegeDocument = HydratedDocument<College>;
export const CollegeSchema = SchemaFactory.createForClass(College);
