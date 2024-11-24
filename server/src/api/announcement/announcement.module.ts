import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Announcement,
  AnnouncementSchema,
} from './schemas/announcement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Announcement.name,
        schema: AnnouncementSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class AnnouncementModule {}
