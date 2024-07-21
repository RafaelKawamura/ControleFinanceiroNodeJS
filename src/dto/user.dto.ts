export class UserCreateDto {
  user_name: string;
  email: string;
  password: string;
}

export class UserUpdateDto extends UserCreateDto {}
