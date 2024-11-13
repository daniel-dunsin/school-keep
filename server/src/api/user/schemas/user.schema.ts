import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { Roles } from '../enums';
import mongoose, { HydratedDocument } from 'mongoose';
import { School, SchoolDocument } from 'src/api/school/schemas/school.schema';

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

  @Prop()
  profilePicture: string;

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
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
