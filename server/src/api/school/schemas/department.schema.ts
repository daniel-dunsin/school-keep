import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { School, SchoolDocument } from './school.schema';
import { College, CollegeDocument } from './college.schema';

@DBSchema()
export class Department extends TimestampMixin {
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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: College.name,
  })
  college: CollegeDocument;

  @Prop({ default: 1 })
  levelsCount: number;
}

export type DepartmentDocument = HydratedDocument<Department>;
export const DepartmentSchema = SchemaFactory.createForClass(Department);
