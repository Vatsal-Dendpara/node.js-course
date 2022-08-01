import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return {
        id: 1,
        name: 'marius',
      };
    }),
    findById: jest.fn((id) => {
      return {
        id,
        name: 'marius',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(controller.createUser({ name: 'Vatsal' })).toEqual({
      id: expect.any(Number),
      name: 'Vatsal',
    });
  });

  it('should get user', async () => {
    expect(await controller.getUsers('marius')).toEqual({
      id: 1,
      name: 'marius',
    });
  });

  it('should get user by id', async () => {
    expect(await controller.getUserById(1)).toEqual({
      id: 1,
      name: 'marius',
    });
  });
});
