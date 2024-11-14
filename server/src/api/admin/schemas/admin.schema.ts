import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserDocument } from 'src/api/user/schemas/user.schema';
import { DBSchema } from 'src/shared/schemas/db.schema';
import { AdminRoles } from '../enums';
import {
  Department,
  DepartmentDocument,
} from 'src/api/school/schemas/department.schema';

@DBSchema()
export class Admin {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: UserDocument;

  @Prop({
    type: String,
    enum: Object.values(AdminRoles),
    default: AdminRoles.Admin,
  })
  permission: AdminRoles;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
    required: false,
  })
  department?: DepartmentDocument;
}

export type AdminDocument = HydratedDocument<Admin>;
export const AdminSchema = SchemaFactory.createForClass(Admin);
