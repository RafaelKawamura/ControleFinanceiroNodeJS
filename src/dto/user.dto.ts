import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  user_name: string;
  email: string;
  password: string;
}

export class UserUpdateDto extends UserCreateDto {}

/* >>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>><<<<<<<<<<<< */
export class CreateUserDtoTest {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  password: string;
}
