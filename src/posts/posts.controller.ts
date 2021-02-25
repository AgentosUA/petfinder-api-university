import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  // constructor(private postService: PostsService) {}
  constructor() {}

  @Get()
  getPosts() {

  }

  @Get('/:id')
  getPostById(@Param('id') id) {
    // return this.postService.getPostById(id);
  }
}
