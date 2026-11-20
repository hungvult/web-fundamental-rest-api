import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import SecuredUser from './entities/secured-user.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(securedUser: SecuredUser) {
    const payload = {
      username: securedUser.username,
      role: securedUser.role,
      sub: securedUser.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<SecuredUser | null> {
    // Get user
    const user: User | undefined = this.usersService
      .findAll()
      .find((user) => user.username === username && user.password === password);

    if (user) {
      const { username, id, role } = user;
      const securedUser: SecuredUser = { username, id, role };

      return await Promise.resolve(securedUser);
    }
    return null;
  }
}
