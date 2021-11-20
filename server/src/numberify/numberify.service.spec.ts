import { Test, TestingModule } from '@nestjs/testing';
import { NumberifyService } from './numberify.service';

describe('NumberifyService', () => {
  let service: NumberifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NumberifyService],
    }).compile();

    service = module.get<NumberifyService>(NumberifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
