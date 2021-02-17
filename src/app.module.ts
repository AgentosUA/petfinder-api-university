import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        useFindAndModify: false,
        uri: process.env.DATABASE_URL
      })
    }),
    UsersModule,
    AuthModule,
    PostsModule
  ],
  controllers: [AppController, PostsController],
  providers: [AppService],
})

export class AppModule {}
