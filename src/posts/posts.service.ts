import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDocument, Post } from './post.model';

@Injectable()
export class PostsService {

  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) { }
  async getPosts({ type, gender, status, page, limit }) {
    const searchFilters = {} as any;

    if (type) searchFilters.type = type;
    if (gender) searchFilters.gender = gender;
    if (status) searchFilters.status = status;

    const posts = this.postModel.find().where(searchFilters).skip(page * limit - limit || 0).limit(limit || 10).sort({ date: 'asc' });
    return posts;
  }

  async getPostById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Невірний ID');

    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Такого оголошення не існує');
    return post;
  }

  async createPost(createPostDto: CreatePostDto, user): Promise<Post> {
    const { name, date, description, gender, type, status, images } = createPostDto;

    const post: Post = {
      name,
      date,
      description,
      gender,
      images,
      status,
      type,
      creator: user
    }

    const createdPost = new this.postModel(post);
    return createdPost.save();
  }
}
