import { Test, TestingModule } from '@nestjs/testing';
import { OrmRelationsController } from './orm-relations.controller';

describe('OrmRelationsController', () => {
  let controller: OrmRelationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrmRelationsController],
    }).compile();

    controller = module.get<OrmRelationsController>(OrmRelationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
