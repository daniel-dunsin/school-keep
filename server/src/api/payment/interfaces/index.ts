import { Channels } from '../enums';

export interface InitiatePaymentDto {
  email: string;
  amount: number;
  transaction_ref: string;
  customer_name: string;
  payment_channels?: Channels[];
}

export interface SquadWebhook {
  Event: 'charge_successful';
  TransactionRef: string;
  Body: {
    amount: number;
    transaction_ref: string;
    transaction_status: string;
    email: string;
    transaction_type: string;
    meta: any;
  };
}
