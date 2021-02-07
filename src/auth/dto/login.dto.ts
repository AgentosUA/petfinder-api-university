import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Введіть пошту' })
  @IsEmail({}, {
    message: 'Невірний формат пошти'
  })
  email: string;

  @IsNotEmpty({ message: 'Введіть пароль' })
  password: string;
}
