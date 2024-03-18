import { Test, TestingModule } from '@nestjs/testing';
import { ConditionalController } from './conditional.controller';

describe('ConditionalController', () => {
  let controller: ConditionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionalController],
    }).compile();

    controller = module.get<ConditionalController>(ConditionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
