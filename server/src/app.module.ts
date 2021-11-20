import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NumberifyService } from './numberify/numberify.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.test.env' : '.env',
    }),
    LoggerModule.forRoot({
      pinoHttp: [
        {
          level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
          transport:
            process.env.NODE_ENV !== 'production'
              ? { target: 'pino-pretty' }
              : {},
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, NumberifyService],
})
export class AppModule {}
