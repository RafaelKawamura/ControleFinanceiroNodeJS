import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User } from './user.entity';
  import { resultDto } from '../Dto/result.dto';
  import { SpenderCreateDto, SpenderUpdateDto } from 'src/Dto/Spender.Dto';
  
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

  }
  