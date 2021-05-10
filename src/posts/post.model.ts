import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Types } from 'mongoose'
import { User } from 'src/users/user.model';

export type PostDocument = Post & Document;
@Schema()
export class Post {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: animalType;

  @Prop({ required: true })
  status: animalStatus;

  @Prop({ required: true })
  gender: animalGender;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  city: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: User
};

export const PostSchema = SchemaFactory.createForClass(Post);

export interface Post {
  name: string;
  type: animalType;
  status: animalStatus;
  gender: animalGender;
  date: Date;
  description: string;
  image: string;
  city: string;
  creator: User;
};

export enum animalType {
  cat = 'cat',
  dog = 'dog',
  other = 'other',
};

export enum animalStatus {
  founded = 'founded',
  escaped = 'escaped',
};

export enum animalGender {
  male = 'male',
  female = 'female',
  unknown = 'unknown'
};
