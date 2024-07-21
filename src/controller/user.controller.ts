import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { ResultDto } from '../dto/result.dto';
import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/findall')
  public async findAll(): Promise<User[] | null> {
    return await this.userService.findAll();
  }
  @Get('/findbyid/:id')
  public async findOne(@Param('id') user_id: number): Promise<User> {
    const findID = await this.userService.findById(user_id);
    return findID;
  }

  @Post('/create')
  async create(@Body() data: UserCreateDto): Promise<ResultDto> {
    return this.userService.create(data);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<ResultDto> {
    return this.userService.update(id, userUpdateDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<ResultDto> {
    return this.userService.delete(id);
  }
}
