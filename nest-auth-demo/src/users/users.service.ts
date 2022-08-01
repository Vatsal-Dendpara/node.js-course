import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'abc',
      username: 'abc',
      password: 'abc',
    },
    {
      id: 2,
      name: 'def',
      username: 'def',
      password: 'def',
    },
  ];

  async findOne(username): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
