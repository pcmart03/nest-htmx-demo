import { Test, TestingModule } from '@nestjs/testing';
import { NestedController } from './nested.controller';

describe('NestedController', () => {
  let controller: NestedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NestedController],
    }).compile();

    controller = module.get<NestedController>(NestedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
