import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserDocument } from '@nestjs-chat-microservices/auth/src/schemas/user.schema'; // Import the User schema

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  NONBINARY = 'nonbinary',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum MeasurementSystemEnum {
  IMPERIAL = 'imperial',
  METRIC = 'metric',
}

@Schema()
export class Profile extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: UserDocument;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ enum: GenderEnum, required: true })
  gender: GenderEnum;

  @Prop({ enum: MeasurementSystemEnum, default: MeasurementSystemEnum.METRIC })
  measurementSystem: MeasurementSystemEnum;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
export type ProfileDocument = Profile & Document;
