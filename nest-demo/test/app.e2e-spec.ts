import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
//import { AppModule } from './../src/app.module';
import { UsersModule } from '../src/users/users.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get all users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('should get user by its name (GET)', () => {
    return request(app.getHttpServer()).get('/users?name=John').expect(200);
  });

  it('should get user by id (GET)', async () => {
    return request(app.getHttpServer()).get('/users/1').expect(200);
  });

  it('should create a new user (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ id: 5, name: 'test user' })
      .expect(201);
  });
});
