import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SquadCoProvider } from './providers/squadco.provider';
import { SquadProvider } from './providers/squad.provider';
import { ClearanceModule } from '../clearance/clearance.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
    forwardRef(() => ClearanceModule),
  ],
  providers: [PaymentService, SquadCoProvider, SquadProvider],
  controllers: [PaymentController],
  exports: [MongooseModule, SquadProvider, PaymentService],
})
export class PaymentModule {}
