import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;
}

export class UpdateUserDto {
  @IsOptional()
  name: string;
  
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  phone: string;
}
