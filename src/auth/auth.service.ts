import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.usersService
      .findAll()
      .find((user) => user.username === username && user.password === password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
