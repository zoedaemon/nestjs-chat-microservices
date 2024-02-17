import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserDocument } from '@nestjs-chat-microservices/auth/src/schemas/user.schema'; // Import the User schema

@Schema()
export class Interests extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: UserDocument;

  @Prop({ type: [{ type: String }] })
  interests: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Interests);
export type InterestsDocument = Interests & Document;
