import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Announcement,
  AnnouncementSchema,
} from './schemas/announcement.schema';
import { SharedModule } from 'src/shared/shared.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Announcement.name,
        schema: AnnouncementSchema,
      },
    ]),
    SharedModule,
    StudentModule,
  ],
  exports: [MongooseModule],
})
export class AnnouncementModule {}
