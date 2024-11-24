import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clearance, ClearanceSchema } from './schemas/clearance.schema';
import {
  ClearanceActivity,
  ClearanceActivitySchema,
} from './schemas/clearance-activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clearance.name,
        schema: ClearanceSchema,
      },
      {
        name: ClearanceActivity.name,
        schema: ClearanceActivitySchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class ClearanceModule {}
