export enum PayDirection {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum PaymentReason {
  CLEARANCE = 'clearance',
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
}

export type Channels = 'card' | 'bank' | 'ussd' | 'transfer';
