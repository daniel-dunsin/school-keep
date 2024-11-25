import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Announcement,
  AnnouncementSchema,
} from './schemas/announcement.schema';
import { SharedModule } from 'src/shared/shared.module';
import { StudentModule } from '../student/student.module';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

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
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  exports: [MongooseModule],
})
export class AnnouncementModule {}
