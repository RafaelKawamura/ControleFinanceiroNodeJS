import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from 'src/Dto/User.Dto';
import { resultDto } from '../Dto/result.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findById(user_id: number): Promise<User> {
    const findUser = await this.userRepository.findOneBy({
      user_id,
    });
    return findUser;
  }

  async findAll(): Promise<User[]> {
    const findAll = await this.userRepository.find();
    return findAll;
  }
}
