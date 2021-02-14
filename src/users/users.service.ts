import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async updateUser(id: string, createUserDto: CreateUserDto, userAuthData: UserAuthData): Promise<User> {
    if(userAuthData.userId !== id) throw new UnauthorizedException('Ви не можете редагути дані іншого користувача!');
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Невірний ID');

    const { name, email, password } = createUserDto;

    const updateFields: Partial<User> = {};

    if (name) {
      updateFields.name = name;
    }

    if (email) {
      updateFields.email = email;
    }

    if (password) {
      updateFields.password = password;
    }

    const user = await this.userModel.findOneAndUpdate({ _id: id }, updateFields);
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Невірний ID');

    const deletedUser = await this.userModel.deleteOne({ _id: id });
    return deletedUser;
  }
}
