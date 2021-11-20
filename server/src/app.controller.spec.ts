import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NumberifyService } from './numberify/numberify.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.test.env',
        }),
      ],
      controllers: [AppController],
      providers: [AppService, NumberifyService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('[GET] /healthz', () => {
    it('should work', () => {
      expect(appController.getHealth()).toBe('ok');
    });
  });

  describe('[GET] /validatePhone', () => {
    it('should call appService', async () => {
      const mockData = {
        valid: true,
      };
      jest
        .spyOn(appService, 'validatePhone')
        .mockImplementationOnce(async () => mockData);
      const phone = '12321';
      expect(await appController.getValidatePhone(phone)).toBe(mockData);
      expect(appService.validatePhone).toHaveBeenCalledWith(phone);
    });
  });
});
