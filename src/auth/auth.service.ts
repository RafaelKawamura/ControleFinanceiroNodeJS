import { Injectable } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from 'src/errors/errors';
import { UserPayload } from './models/UserPayload';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    // transform user in a JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      user_name: user.user_name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError('Invalid Email or Password');
  }
}
