import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/user.model';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { PostDocument, Post } from './post.model';
import { uploadFile, deleteFile } from '../shared/google-storage';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private postModel: Model<PostDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}
  async getPosts({ type, gender, status, page, limit, date, city }) {
    const searchFilters = {} as any;

    if (!page) throw new BadRequestException('Не вказана сторінка!');

    if (!limit) limit = 9;

    if (type && type !== 'all' && type !== 'undefined')
      searchFilters.type = type;

    if (gender && gender !== 'all' && gender !== 'undefined')
      searchFilters.gender = gender;

    if (status && status !== 'all' && status !== 'undefined')
      searchFilters.status = status;

    if (date && date !== 'all' && date !== 'undefined') {
      const [day, month, year] = date.split('.');
      searchFilters.date = {
        $gte: new Date(`${year}/${month}/${day}`).toISOString(),
      };
    }

    if (city && city !== 'all' && city !== 'undefined')
      searchFilters.city = new RegExp(city, 'i');

    const posts = await this.postModel
      .find()
      .where(searchFilters)
      .skip(page * limit - limit || 0)
      .limit(limit)
      .sort({ date: 'asc' });
    const totalCount = (await this.postModel.find().where(searchFilters))
      ?.length;

    return {
      posts,
      totalCount,
      limit,
    };
  }

  async getPostById(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Невірний ID');

    const post = await this.postModel
      .findById(id)
      .populate('creator', 'name phone');
    if (!post) throw new NotFoundException('Такого оголошення не існує');
    return post;
  }

  async createPost(createPostDto: CreatePostDto, userId): Promise<Post> {
    const {
      name,
      date,
      description,
      gender,
      type,
      status,
      image,
      city,
    } = createPostDto;

    if (
      !name ||
      !date ||
      !description ||
      !gender ||
      !type ||
      !status ||
      !image ||
      !city
    )
      throw new BadRequestException('Не всі поля вказані!');

    const imageUrl = await uploadFile(image, `images/${type || 'other'}`);
    if (!imageUrl)
      throw new InternalServerErrorException(
        'Не вдалось завантажити зображення на Google Cloud!',
      );

    const post: Post = {
      name,
      date,
      description,
      gender,
      image: imageUrl,
      status,
      type,
      city,
      creator: userId,
    };

    const createdPost = await new this.postModel(post).save();
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { posts: createdPost._id },
    });

    return createdPost;
  }

  async updatePost(updatePostDto: UpdatePostDto, userId): Promise<Post> {
    const {
      id,
      name,
      date,
      description,
      gender,
      type,
      status,
      image,
      city,
    } = updatePostDto;

    if (!id) throw new BadRequestException('Не всі поля вказані!');

    const post = await this.postModel.findById(id);

    if (!post) throw new NotFoundException('Оголошення не знайдено!');
    if (post.creator !== userId) {
      throw new UnauthorizedException(
        'Ви не можете видаляти дані чужої тваринки!',
      );
    }

    let imageUrl;

    if (image) {
      imageUrl = await uploadFile(image, `images/${type || 'other'}`);
      if (!imageUrl)
        throw new InternalServerErrorException(
          'Не вдалось завантажити зображення на Google Cloud!',
        );
      await deleteFile(post.image);
    }

    post.name = name || post.name;
    post.date = date || post.date;
    post.description = description || post.description;
    post.image = imageUrl || post.image;
    post.gender = gender || post.gender;
    post.status = status || post.status;
    post.type = type || post.type;
    post.city = city || post.city;
    await post.save();

    return post;
  }

  async deletePost(postId, userId) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Оголошення не знайдено!');
    if (post.creator !== userId)
      throw new UnauthorizedException(
        'Ви не можете видаляти дані чужої тваринки!',
      );

    await deleteFile(post.image);
    await post.delete();
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { posts: postId },
    });
  }
}
