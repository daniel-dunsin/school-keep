import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import {
  StudentActivity,
  StudentActivitySchema,
} from './schemas/student-activity.schema';
import { DocumentModule } from '../documents/documents.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
      {
        name: StudentActivity.name,
        schema: StudentActivitySchema,
      },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => SharedModule),
    DocumentModule,
  ],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [MongooseModule],
})
export class StudentModule {}
