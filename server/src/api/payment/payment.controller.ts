import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { SquadWebhook } from './interfaces';
import { IsPublic } from 'src/core/decorators/auth.decoractor';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/squad/webhook')
  @IsPublic()
  async processSquadWebhook(@Body() body: SquadWebhook) {
    return this.paymentService.processSquadWebhook(body);
  }
}
