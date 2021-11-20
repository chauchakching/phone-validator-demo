import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import pino from 'pino';

@Injectable()
export class NumberifyService {
  accessKey: string;
  axiosInstance: AxiosInstance;

  constructor() {
    const accessKey = process.env.NUMVERIFY_API_ACCESS_KEY;
    if (!accessKey) throw Error('missing api key for numberify service');
    this.accessKey = accessKey;

    const apiCallLogger = pino(
      pino.transport({
        target: 'pino/file',
        options: { destination: 'output/logs.txt', mkdir: true },
      }),
    );

    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.response.use((response) => {
      if (process.env.NODE_ENV === 'test') return response;

      apiCallLogger.info({
        url: response.config.url,
        status: response.status,
        data: response.data,
      });

      return response;
    });
  }

  async validatePhone(phone: string) {
    const response = await this.axiosInstance.get(
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
