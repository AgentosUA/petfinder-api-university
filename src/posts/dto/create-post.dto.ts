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
  image: string;
}

export class UpdatePostDto {
  @IsOptional()
  name: string;
  
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  phone: string;
}
