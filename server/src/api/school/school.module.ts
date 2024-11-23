import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from './schemas/school.schema';
import { College, CollegeSchema } from './schemas/college.schema';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { SharedModule } from 'src/shared/shared.module';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { StudentModule } from '../student/student.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: School.name,
        schema: SchoolSchema,
      },
      {
        name: College.name,
        schema: CollegeSchema,
      },
      {
        name: Department.name,
        schema: DepartmentSchema,
      },
    ]),
    forwardRef(() => SharedModule),
    StudentModule,
    forwardRef(() => AdminModule),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [MongooseModule],
})
export class SchoolModule {}
