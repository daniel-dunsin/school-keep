import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { Roles } from '../enums';
import mongoose, { HydratedDocument } from 'mongoose';
import { School, SchoolDocument } from 'src/api/school/schemas/school.schema';
import { DEFAULT_IMAGES } from 'src/shared/constants';
import {
  Student,
  StudentDocument,
} from 'src/api/student/schemas/student.schema';
import { Admin, AdminDocument } from 'src/api/admin/schemas/admin.schema';

@DBSchema()
export class User extends TimestampMixin {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: DEFAULT_IMAGES.profilePicture })
  profilePicture: string;

  @Prop()
  profilePictureId: string;

  @Prop({
    type: String,
    enum: Object.values(Roles),
  })
  role: Roles;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: School.name,
  })
  school: SchoolDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Student.name,
  })
  student: StudentDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Admin.name,
  })
  admin: AdminDocument;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
