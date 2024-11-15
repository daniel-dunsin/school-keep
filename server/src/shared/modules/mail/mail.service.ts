import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMail } from './interfaces';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(dto: SendMail) {
    const { to, template, context, subject } = dto;

    try {
      await this.mailerService.sendMail({
        from: 'noreply@SchoolKeep.com',
        to,
        subject,
        template,
        context,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
