import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity.js';

export type PublicUser = Omit<User, 'password'>;

function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

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

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findAllPublic(): PublicUser[] {
    return this.users.map(toPublicUser);
  }

  findPublicById(id: string): PublicUser {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return toPublicUser(user);
  }
}
