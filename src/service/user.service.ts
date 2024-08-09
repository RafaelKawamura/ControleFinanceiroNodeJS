import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/service/base.service';
import { ResultDto } from '../dto/result.dto';
import { CreateUserDtoTest, UserUpdateDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';

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

  // async create(data: UserCreateDto): Promise<ResultDto> {
  //   const user = this.userRepository.create({
  //     user_name: data.user_name,
  //     email: data.email,
  //     password: data.password,
  //   });
  //   return await this.userRepository
  //     .save(user)
  //     .then(() => {
  //       return <ResultDto>{
  //         status: 201,
  //         message: 'User ' + data.user_name + ' registered on id: ' + user.id,
  //       };
  //     })
  //     // eslint-disable-next-line prettier/prettier
  //     .catch((error) => {
  //       return <ResultDto>{
  //         status: 400,
  //         message: 'Creation failed: ' + error,
  //       };
  //     });
  // }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async create(
    CreateUserDtoTest: CreateUserDtoTest,
  ): Promise<CreateUserDtoTest> {
    try {
      const hashedPassword = await bcrypt.hash(CreateUserDtoTest.password, 10);

      const user = this.userRepository.create({
        user_name: CreateUserDtoTest.user_name,
        email: CreateUserDtoTest.email,
        password: hashedPassword,
      });

      const createdUser = await this.userRepository.save(user);

      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Falha na criação do usuário');
    }
    // return <ResultDto>{
    //   status: 201,
    //   message: `Usuário ${CreateUserDtoTest.user_name} registrado com sucesso (ID: ${user.id})`,
    // };
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
