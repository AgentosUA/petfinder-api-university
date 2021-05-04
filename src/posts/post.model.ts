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

  @Prop()
  gender: animalGender;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  images: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: Types.ObjectId
};

export const PostSchema = SchemaFactory.createForClass(Post);

export interface Post {
  name: string;
  type: animalType;
  status: animalStatus;
  gender: animalGender;
  date: Date;
  description: string;
  images: string[];
  creator: Types.ObjectId;
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
