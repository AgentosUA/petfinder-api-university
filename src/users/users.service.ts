import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User, UserRole } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find(user => user.id === id);
  }

  getUsersWithFilter(filtersDto: GetUserFilterDto) {
    const { name, role } = filtersDto;
    let users = this.users;

    if (name) {
      users = users.filter(user => user.name === name)
    }

    if (role) {
      users = users.filter(user => user.role === role)
    }

    return users;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { name, email, password } = createUserDto;
    const user: User = {
      id: `${name}+1`,
      name,
      email,
      password,
      token: '',
      pets: [],
      posts: [],
      role: UserRole.user
    }

    this.users.push(user);
    return user;
  }

  updateUser(id: string, createUserDto): void {
    const user = this.users.find(user => user.id === id);
    this.users = this.users.filter(user => user.id !== id);
  }

  deleteUser(id: string): void {
    const user = this.users.find(user => user.id === id);
    this.users = this.users.filter(user => user.id !== id);
  }
}
