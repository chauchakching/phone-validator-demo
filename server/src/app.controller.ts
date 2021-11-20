import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthz')
  getHealth() {
    return 'ok';
  }

  @Get('validatePhone/:phone')
  getValidatePhone(@Param('phone') phone: string): Promise<Object> {
    return this.appService.validatePhone(phone);
  }

  @Get('validateEmail/:email')
  getValidateEmail(@Param('email') phone: string): Promise<Object> {
    return this.appService.validateEmail(phone);
  }
}
