import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isPasswordMatch } from '../common/password.util.js';
import { UsersService } from '../users/users.service.js';
import SecuredUser from './entities/secured-user.entity.js';

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
    const user = this.usersService.findByUsername(username);
    if (!user || !(await isPasswordMatch(password, user.password))) {
      return null;
    }

    return {
      username: user.username,
      id: user.id,
      role: user.role,
    };
  }
}
