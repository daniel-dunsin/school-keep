import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { SQUAD_PROVIDER } from './squadco.provider';
import { Axios } from 'axios';
import { InitiatePaymentDto } from '../interfaces';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class SquadProvider {
  private readonly logger = new Logger(SquadProvider.name);

  constructor(
    @Inject(SQUAD_PROVIDER)
    private readonly squad: Axios,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(SquadProvider.name);
  }

  async initiatePayment(body: InitiatePaymentDto) {
    try {
      const response = await this.squad.post('/transaction/initiate', {
        email: body.email,
        amount: JSON.stringify(body.amount * 100),
        initiate_type: 'inline',
        currency: 'NGN',
        transaction_ref: body.transaction_ref,
        customer_name: body.customer_name,
        payment_channels: body.payment_channels,
        pass_charge: true,
        callback_url: 'https://google.com',
      });

      if (response.data.status != 200) {
        throw new BadRequestException(response.data.message);
      }

      return {
        auth_url: response.data.data?.checkout_url,
        amount: response?.data?.data?.transaction_amount,
        transaction_ref: response?.data?.data?.transaction_ref,
      };
    } catch (error) {
      this.logger.error(`Payment initiation failed ${error}`);
      throw error;
    }
  }

  async verifyWebhook(req: Request) {
    const hash = crypto
      .createHmac('sha512', this.configService.get('SQUAD_CO_API_KEY'))
      .update(JSON.stringify(req.body))
      .digest('hex')
      .toUpperCase();

    if (hash == req.headers['x-squad-encrypted-body']) return true;

    return false;
  }
}
