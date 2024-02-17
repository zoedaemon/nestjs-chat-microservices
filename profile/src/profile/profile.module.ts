import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './profile.controller';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileMiddleware } from './profile.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:Tcp9DOTJV9jZO7TdN3VvcneYiD@localhost:27017/chatapp',
    ), //TODO: change to env password
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the ProfileMiddleware to all routes within the ProfileModule
    consumer.apply(ProfileMiddleware).forRoutes('profile');
  }
}
