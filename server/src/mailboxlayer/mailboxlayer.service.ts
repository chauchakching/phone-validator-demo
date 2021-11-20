import { Injectable } from '@nestjs/common';
import { axiosInstanceWithLogger } from 'src/axiosUtil';

@Injectable()
export class MailboxlayerService {
  accessKey: string;

  constructor() {
    const accessKey = process.env.MAILBOXLAYER_API_ACCESS_KEY;
    if (!accessKey) throw Error('missing api key for mailboxlayer service');
    this.accessKey = accessKey;
  }
  async validateEmail(email: string) {
    const response = await axiosInstanceWithLogger.get(
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
