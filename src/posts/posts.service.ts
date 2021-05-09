import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/user.model';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDocument, Post } from './post.model';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel('Post') private postModel: Model<PostDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>
  ) { }
  async getPosts({ type, gender, status, page, limit, date }) {
    const searchFilters = {} as any;

    if (!page) throw new BadRequestException('Невірна пошта або пароль!');
    if (!limit) limit = 10;
    if (type) searchFilters.type = type;
    if (gender) searchFilters.gender = gender;
    if (status) searchFilters.status = status;
    if (date) searchFilters.date = date;

    const posts = await this.postModel.find().where(searchFilters).skip(page * limit - limit || 0).limit(limit).sort({ date: 'asc' });

    return posts;
  }

  async getPostById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Невірний ID');

    const post = await this.postModel.findById(id).populate('creator', 'name phone');
    if (!post) throw new NotFoundException('Такого оголошення не існує');
    return post;
  }

  async createPost(createPostDto: CreatePostDto, userId): Promise<Post> {
    const { name, date, description, gender, type, status, images } = createPostDto;

    const post: Post = {
      name,
      date,
      description,
      gender,
      images,
      status,
      type,
      creator: userId
    }

    const createdPost = await new this.postModel(post).save();
    await this.userModel.findByIdAndUpdate(userId, { $push: { "posts": createdPost._id } });

    return createdPost;
  }

  async deletePost(postId, userId) {
    const post = await this.postModel.findById(postId);

    if (post.creator !== userId) throw new UnauthorizedException('Ви не можете редагувати дані чужої тваринки!');

    await post.delete();
    await this.userModel.findByIdAndUpdate(userId, { $pull: { "posts": postId } });
  }
}
