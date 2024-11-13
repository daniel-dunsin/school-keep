import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';

@DBSchema()
export class Auth extends TimestampMixin {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop()
  password: string;

  @Prop()
  passwordResetCode: string;

  @Prop()
  passwordResetCodeExpiresAt: Date;
}

export type AuthDocument = HydratedDocument<Auth>;
export const AuthSchema = SchemaFactory.createForClass(Auth);
