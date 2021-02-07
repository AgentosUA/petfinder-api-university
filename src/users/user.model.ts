import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

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
  pets: [];

  @Prop()
  posts: [];

  @Prop({ required: true })
  phone: string;

  @Prop()
  token: string;
};

export const UserSchema = SchemaFactory.createForClass(User);

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  pets: [];
  posts: [];
  phone: string;
  token: string;
}

export enum UserRole {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user',
}