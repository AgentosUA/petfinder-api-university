import { Body, Controller, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { AuthData } from 'src/shared/auth.decorator';
import { AuthGuard } from 'src/shared/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) { }

  @Get()
  getPosts(@Body() { type, gender, status, page, limit }) {
    return this.postService.getPosts({ type, gender, status, page, limit })
  }

  @Get('/:id')
  getPostById(@Param('id') id) {
    // return this.postService.getPostById(id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  createPost(@Body() { name, date, description, gender, type, status, images }, @AuthData() authData: UserAuthData) {
    return this.postService.createPost({ name, date, description, gender, type, status, images }, authData.userId)
  }
}
