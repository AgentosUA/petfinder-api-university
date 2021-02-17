import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostDocument } from './post.model';

@Injectable()
export class PostsService {

  constructor(@InjectModel('Posts') private postModel: Model<PostDocument>) {}

  async getPosts() {

  }

  async getPostById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Невірний ID');

    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Такого оголошення не існує');
    return post;
  }
}
