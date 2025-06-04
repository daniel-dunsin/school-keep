import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { SquadWebhook } from './interfaces';
import { PaymentReason, PaymentStatus } from './enums';
import {
  StudentClearance,
  StudentClearanceDocument,
} from '../clearance/schemas/student-clearance.schema';
import { SchoolClearance } from '../clearance/schemas/school-clearance.schema';
import { ClearanceService } from '../clearance/clearance.service';
import { StudentClearanceStatus } from '../clearance/enums';
import { Clearance } from '../clearance/schemas/clearance.schema';

@Injectable()
export class PaymentService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(StudentClearance.name)
    private readonly studentClearanceModel: Model<StudentClearanceDocument>,
    @InjectModel(SchoolClearance.name)
    private readonly schoolClearanceModel: Model<SchoolClearance>,
    @InjectModel(Clearance.name)
    private readonly clearanceModel: Model<Clearance>,
    private readonly clearanceService: ClearanceService,
  ) {
    this.logger = new Logger(PaymentService.name);
  }

  async processClearancePayment(transaction: TransactionDocument) {
    const studentClearance = await this.studentClearanceModel.findOne({
      clearance: transaction.meta.school_clearance_id,
    });

    if (!studentClearance) {
      const schoolClearance = await this.schoolClearanceModel.findById(
        transaction.meta.school_clearance_id,
      );

      const clearance = await this.clearanceModel.findOne({
        student: transaction.student?._id,
      });

      await this.studentClearanceModel.create({
        student: transaction.student,
        clearance: transaction.meta.school_clearance_id,
        status: StudentClearanceStatus.Requested,
        documents: transaction.meta.documents,
        lastRequestDate: new Date(),
      });

      await this.clearanceService.trackActivity({
        clearance: clearance?._id,
        content: `Paid for ${schoolClearance?.clearance_name}`,
        user: String(transaction?.student?.user),
      });

      // send notification
      await this.transactionModel.updateOne(
        { _id: transaction._id },
        {
          $set: {
            status: PaymentStatus.SUCCESSFUL,
          },
        },
      );

      return {
        success: true,
        message: 'Clearance paid',
      };
    }
  }

  async processSquadWebhook(body: SquadWebhook) {
    const { Event, Body } = body;

    this.logger.log(`Webhook received ${JSON.stringify(body)}`);

    if (Event != 'charge_successful') {
      return {
        success: false,
        message: 'Method not implemented',
      };
    }

    const { transaction_ref } = Body;

    const transaction = await this.transactionModel
      .findOne({
        transaction_reference: transaction_ref,
      })
      .populate('student');

    if (!transaction) throw new NotFoundException('Transaction not found');

    switch (transaction.payment_for) {
      case PaymentReason.CLEARANCE:
        return this.processClearancePayment(transaction);
      default:
        return null;
    }
  }
}
