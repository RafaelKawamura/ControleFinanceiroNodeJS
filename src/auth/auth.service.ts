import { Injectable } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from 'src/errors/errors';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
