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
import { StudentModule } from '../student/student.module';
import { DocumentModule } from '../documents/documents.module';
import { Clearance, ClearanceSchema } from './schemas/clearance.schema';
import {
  ClearanceActivity,
  ClearanceActivitySchema,
} from './schemas/clearance-activity.schema';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clearance.name,
        schema: ClearanceSchema,
      },
      {
        name: StudentClearance.name,
        schema: StudentClearanceSchema,
      },
      {
        name: SchoolClearance.name,
        schema: SchoolClearanceSchema,
      },
      {
        name: ClearanceActivity.name,
        schema: ClearanceActivitySchema,
      },
    ]),
    forwardRef(() => SchoolModule),
    StudentModule,
    DocumentModule,
    forwardRef(() => UserModule),
    forwardRef(() => SharedModule),
    PaymentModule,
  ],
  controllers: [ClearanceController],
  providers: [ClearanceService],
  exports: [MongooseModule, ClearanceService],
})
export class ClearanceModule {}
