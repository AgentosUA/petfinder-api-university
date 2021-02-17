import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.model';
import { PostsService } from './posts.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])],
  providers: [PostsService]
})
export class PostsModule {}
