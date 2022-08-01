import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['pets'],
    }); // select * from user;
  }

  getOneById(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  createUser(name: string): Promise<User> {
    const user = this.usersRepository.create({ name });
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name;

    return await this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    return this.usersRepository.remove(user);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
