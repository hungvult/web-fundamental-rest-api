import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import type SecuredUser from './entities/secured-user.entity.js';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: SecuredUser }) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register() {
    throw new Error('Method not implemented.');
  }
}
