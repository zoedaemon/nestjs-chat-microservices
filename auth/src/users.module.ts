import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsersController } from './users.controller';//no need to implement user controller yet
import { UsersService } from './services/users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:Tcp9DOTJV9jZO7TdN3VvcneYiD@localhost:27017/chatapp'),//TODO: change to env password
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
//   controllers: [UsersController],//no need to implement user controller yet
  providers: [UsersService],
  exports: [UsersService], // Export the UsersService to make it available to other modules
})
export class UsersModule {}
