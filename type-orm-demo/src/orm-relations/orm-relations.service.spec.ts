import { Test, TestingModule } from '@nestjs/testing';
import { OrmRelationsService } from './orm-relations.service';

describe('OrmRelationsService', () => {
  let service: OrmRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrmRelationsService],
    }).compile();

    service = module.get<OrmRelationsService>(OrmRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
