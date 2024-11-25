import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DBSchema, TimestampMixin } from 'src/shared/schemas/db.schema';
import { AnnouncementDestination, AnnouncementStatus } from '../enums';
import {
  College,
  CollegeDocument,
} from 'src/api/school/schemas/college.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  Department,
  DepartmentDocument,
} from 'src/api/school/schemas/department.schema';
import { School, SchoolDocument } from 'src/api/school/schemas/school.schema';

@DBSchema()
export class Announcement extends TimestampMixin {
  @Prop()
  image?: string;

  @Prop()
  image_public_id: string;

  @Prop({ default: Date.now() })
  start_date?: Date;

  @Prop()
  end_date?: Date;

  @Prop({
    type: String,
    enum: Object.values(AnnouncementDestination),
    default: AnnouncementDestination.General,
  })
  destination_type: AnnouncementDestination;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: College.name,
      },
    ],
    default: [],
  })
  colleges: CollegeDocument[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Department.name,
      },
    ],
    default: [],
  })
  departments: DepartmentDocument[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: School.name,
  })
  school: SchoolDocument;

  @Prop({
    type: String,
    enum: Object.values(AnnouncementStatus),
    default: AnnouncementStatus.Active,
  })
  status: AnnouncementStatus;

  @Prop()
  title: string;

  @Prop()
  content?: string;
}

export type AnnouncementDocument = HydratedDocument<Announcement>;
export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
