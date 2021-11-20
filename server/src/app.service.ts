import { Injectable } from '@nestjs/common';
import { NumberifyService } from './numberify/numberify.service';

@Injectable()
export class AppService {
  constructor(private readonly numberifyService: NumberifyService) {}

  async validatePhone(phone: string): Promise<Object> {
    return this.numberifyService.validatePhone(phone);
  }
}
