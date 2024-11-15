import { Module } from '@nestjs/common';
import { EmailService } from './mail.service';

@Module({
  providers: [EmailService],
})
export class EmailModule {}
