import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailboxlayerService {
  accessKey: string;

  constructor() {
    const accessKey = process.env.MAILBOXLAYER_API_ACCESS_KEY;
    if (!accessKey) throw Error('missing api key for mailboxlayer service');
    this.accessKey = accessKey;
  }
  async validateEmail(email: string) {
    const response = await axios.get(
      'http://apilayer.net/api/check',
      {
        params: {
          email,
          access_key: this.accessKey,
        },
      },
    );
    return response.data;
  }
}
