import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  getUsers(@Query() filterDto: GetUserFilterDto): User[] {
    if (Object.keys(filterDto).length) {
      return this.userService.getUsersWithFilter(filterDto);
    }
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): User {
    return this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() CreateUserDto: CreateUserDto): User {
    return this.userService.createUser(CreateUserDto);
  }

  // TODO
  // @Patch('/:id')
  // patchUser(
  //   @Body() CreateUserDto: CreateUserDto,
  //   @Param() id: string
  // ): User {
  //   return this.userService.updateUser(CreateUserDto);
  // }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): void {
    this.userService.deleteUser(id);
  }
}
