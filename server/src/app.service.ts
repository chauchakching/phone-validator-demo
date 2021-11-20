import { Injectable } from '@nestjs/common';
import { MailboxlayerService } from './mailboxlayer/mailboxlayer.service';
import { NumberifyService } from './numberify/numberify.service';

@Injectable()
export class AppService {
  constructor(private readonly numberifyService: NumberifyService,
    private readonly mailboxlayerService: MailboxlayerService) {}

  async validatePhone(phone: string): Promise<Object> {
    return this.numberifyService.validatePhone(phone);
  }

  async validateEmail(email: string): Promise<Object> {
    return this.mailboxlayerService.validateEmail(email)
  }
}
