import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    UserModule,
    forwardRef(() => SharedModule),
  ],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [MongooseModule],
})
export class StudentModule {}
