import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/services/auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema} from '../src/schemas/user.schema';
import { UsersService } from '../src/services/users.service';
import { LocalStrategy } from '../src/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import {MockUserModel} from './mocks/user.model.mock';
import { JwtStrategy } from '../src/jwt.strategy';
import { UsersModule } from '../src/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../src/auth.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
// import { before } from 'node:test';

describe('AuthController', () => {
  let authController: AuthController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let mockUserModel: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: 'sso3XcQU1QMCpcfUi3wvC', // Change this to your own secret key
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        LocalStrategy,
        JwtStrategy,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
      controllers: [AuthController],
    }).compile();
    

    authController = module.get<AuthController>(AuthController);
  })
  
  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  beforeEach(async () => {
    // mockUserModel = {
    //   findOne: jest.fn(),
    //   save: jest.fn(),
    // };    
  });

  describe("register", () => {

    it('should register a new user', async () => {
      const registerDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'testpassword',
      };

      const createdUser = await authController.register(registerDto);
      expect(createdUser.message).toBe(registerDto.username+ " created");
    });

    it('should throw conflict exception if username or email already exists during registration', async () => {
      const registerDto = {
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'testpassword',
      };

      (new userModel(registerDto).save());

      await expect(authController.register(registerDto)).rejects.toThrowError('Username or email already exists');
      // expect(userModel.save).not.toHaveBeenCalled();
    });
  })
  
});
