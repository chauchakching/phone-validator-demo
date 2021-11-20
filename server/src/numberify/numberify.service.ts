import { Injectable } from '@nestjs/common';
import { axiosInstanceWithLogger } from 'src/axiosUtil';

@Injectable()
export class NumberifyService {
  accessKey: string;

  constructor() {
    const accessKey = process.env.NUMVERIFY_API_ACCESS_KEY;
    if (!accessKey) throw Error('missing api key for numberify service');
    this.accessKey = accessKey;
  }

  async validatePhone(phone: string) {
    const response = await axiosInstanceWithLogger.get(
      'http://apilayer.net/api/validate',
      {
        params: {
          number: phone,
          format: 1,
          access_key: this.accessKey,
        },
      },
    );
    return response.data;
  }
}
