import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User, UserDocument, UserRole } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

  }

  getAllUsers(): any {
    // return this.users;
  }

  getUserById(id: string): any {
    // return this.users.find(user => user.id === id);
  }

  getUsersWithFilter(filtersDto: GetUserFilterDto) {
    const { name, role } = filtersDto;
    let users = [];

    if (name) {
      users = users.filter(user => user.name === name)
    }

    if (role) {
      users = users.filter(user => user.role === role)
    }

    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phone } = createUserDto;
    const user: User = {
      name,
      email,
      password,
      phone,
      token: '',
      pets: [],
      posts: [],
      role: UserRole.user
    }

    const createdUser = new this.userModel(user);
    // this.users.push(user);
    return createdUser.save();
  }

  updateUser(id: string, createUserDto): void {
    // const user = this.users.find(user => user.id === id);
    // this.users = this.users.filter(user => user.id !== id);
  }

  deleteUser(id: string): void {
    // const user = this.users.find(user => user.id === id);
    // this.users = this.users.filter(user => user.id !== id);
  }
}
