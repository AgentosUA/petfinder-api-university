import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthData } from 'src/shared/auth.decorator';
import { AuthGuard } from 'src/shared/auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('/profile')
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  getProfile(@AuthData() authData: UserAuthData): Promise<User> {
    return this.userService.getUserById(authData.userId);
  }

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
  @UseGuards(new AuthGuard())
  patchUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @AuthData() authData: UserAuthData,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto, authData);
  }

  // @Delete('/:id')
  // @UseGuards(new AuthGuard())
  // @UsePipes(ValidationPipe)
  // deleteUser(@Param('id') id: string): void {
  //   this.userService.deleteUser(id);
  // }
}
