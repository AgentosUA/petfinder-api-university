import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { Post, PostSchema } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Post', schema: PostSchema}, {name: 'User', schema: UserSchema}])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
