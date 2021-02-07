import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  @UsePipes(ValidationPipe)
  getUsers(@Query() filterDto: GetUserFilterDto): Promise<User[]> {
    if (Object.keys(filterDto).length) {
      return this.userService.getUsersWithFilter(filterDto);
    }
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(CreateUserDto);
  }

  @Patch('/:id')
  patchUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteUser(@Param('id') id: string): void {
    this.userService.deleteUser(id);
  }
}
