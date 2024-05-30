import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  login(username: string) {
    return {
      access_token: this.jwtService.sign({ username }),
    };
  }

  async register({ username, password }: LoginDto) {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ username, password: hash });
    return this.login(user.username);
  }
}
