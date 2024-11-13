import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { StudentStatus } from '../enums';
import {
  Department,
  DepartmentDocument,
} from 'src/api/school/schemas/department.schema';

@DBSchema()
export class Student extends TimestampMixin {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop()
  matricNumber: string;

  @Prop({
    type: String,
    enum: Object.values(StudentStatus),
    default: StudentStatus.Active,
  })
  status: StudentStatus;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
  })
  department: DepartmentDocument;
}

export type StudentDocument = HydratedDocument<Student>;
export const StudentSchema = SchemaFactory.createForClass(Student);
