import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User, UserDocument, UserRole } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

  }

  async getAllUsers(): Promise<User[]> {
    const users = this.userModel.find().limit(20);
    return users;
  }

  async getUserById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Невірний ID');

    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Такого користувача не існує');
    return user;
  }

  async getUsersWithFilter(filtersDto: GetUserFilterDto): Promise<User[]> {
    const { name, role } = filtersDto;

    const searchFields: Partial<User> = {};

    if (name) {
      searchFields.name = name;
    }

    if (role) {
      searchFields.role = role;
    }

    const users = this.userModel.find(searchFields).limit(20);
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phone } = createUserDto;

    const isUserExsists = await this.userModel.find({ email });

    if (isUserExsists.length) throw new BadRequestException('Користувач вже існує');

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

  // TODO
  // updateUser(id: string, createUserDto): void {
    // const user = this.users.find(user => user.id === id);
    // this.users = this.users.filter(user => user.id !== id);
  // }

  deleteUser(id: string): void {
    // const user = this.users.find(user => user.id === id);
    // this.users = this.users.filter(user => user.id !== id);
  }
}
