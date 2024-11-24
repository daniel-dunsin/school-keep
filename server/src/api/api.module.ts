import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { DocumentModule } from './documents/documents.module';
import { ClearanceModule } from './clearance/clearance.module';
import { AnnouncementModule } from './announcement/announcement.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SchoolModule,
    AdminModule,
    StudentModule,
    DocumentModule,
    ClearanceModule,
    AnnouncementModule,
  ],
})
export class ApiModule {}
