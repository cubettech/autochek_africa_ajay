// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (
      user &&
      (await this.userService.comparePasswords(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.validateUser(
        loginUserDto.username,
        loginUserDto.password,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = {
        username: user.username,
        sub: user.id,
        type: user.type,
      };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch (error) {
      console.error(error);
    }
  }
}
