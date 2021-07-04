import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'
import { Post, PostSchema } from 'src/posts/post.model';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: UserRole;

  @Prop()
  pets: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ required: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  pets: Types.ObjectId[];
  posts: Post[];
  phone: string;
  token: string;
}

export enum UserRole {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user',
}