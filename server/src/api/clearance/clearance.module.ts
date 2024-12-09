import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StudentClearance,
  StudentClearanceSchema,
} from './schemas/student-clearance.schema';
import {
  SchoolClearance,
  SchoolClearanceSchema,
} from './schemas/school-clearance.schema';
import { ClearanceController } from './clearance.controller';
import { ClearanceService } from './clearance.service';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StudentClearance.name,
        schema: StudentClearanceSchema,
      },
      {
        name: SchoolClearance.name,
        schema: SchoolClearanceSchema,
      },
    ]),
    forwardRef(() => SchoolModule),
  ],
  controllers: [ClearanceController],
  providers: [ClearanceService],
  exports: [MongooseModule],
})
export class ClearanceModule {}
