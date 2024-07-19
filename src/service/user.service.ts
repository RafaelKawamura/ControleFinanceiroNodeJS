import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { BaseService } from 'src/service/base.service';
import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';
import { ResultDto } from '../dto/result.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }

  async findAll(): Promise<User[]> {
    const findAll = await this.userRepository.find();
    return findAll;
  }

  async findById(id: number): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ id });
    return findUser;
  }

  async create(data: UserCreateDto): Promise<ResultDto> {
    const user = this.userRepository.create({
      user_name: data.user_name,
      email: data.email,
      password: data.password,
    });
    return await this.userRepository
      .save(user)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'User ' + data.user_name + ' registered on id: ' + user.id,
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: 400,
          message: 'Creation failed: ' + error,
        };
      });
  }

  async update(id: number, userUpdateDto: UserUpdateDto): Promise<ResultDto> {
    return this.userRepository
      .update(id, userUpdateDto)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'User updated!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Update failed',
          data: error,
        };
      });
  }

  async delete(id: number): Promise<ResultDto> {
    return this.userRepository
      .delete(id)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'User deleted!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Deletion failed: ' + error,
        };
      });
  }
}
