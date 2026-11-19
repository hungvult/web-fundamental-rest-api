import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 'user_001',
      username: 'user1',
      password: 'password1',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'user_002',
      username: 'admin1',
      password: 'password2',
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
