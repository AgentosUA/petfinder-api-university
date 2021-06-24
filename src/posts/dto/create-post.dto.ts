import { Optional } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { animalGender, animalStatus, animalType } from '../post.model';

export class CreatePostDto {
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
  city: string;

  @Prop({ required: true })
  image: any;
}

export class UpdatePostDto {
  @Prop({ required: true })
  id: any;

  @Optional()
  name: string;

  @Optional()
  type: animalType;

  @Optional()
  status: animalStatus;

  @Optional()
  gender: animalGender;

  @Optional()
  date: Date;

  @Optional()
  description: string;

  @Optional()
  city: string;

  @Optional()
  image: any;
}
