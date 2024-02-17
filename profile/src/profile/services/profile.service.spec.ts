// profile.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Connection, Model, connect } from 'mongoose';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { Profile, ProfileSchema, GenderEnum } from '../schemas/profile.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProfileModule } from '../profile.module';
import { INestApplication } from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let profileModel: Model<Profile>;
  let app: INestApplication;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    profileModel = mongoConnection.model(Profile.name, ProfileSchema);
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     ProfileService,
    //     {
    //       provide: getModelToken('Profile'),
    //       useValue: {}, // You can provide a mock model here if needed
    //     },
    //   ],
    // }).compile();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ProfileModule],
      providers: [
        ProfileService,
        { provide: getModelToken(Profile.name), useValue: profileModel },
      ],
      exports: [ProfileService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);

    // app = module.createNestApplication();
    // // app.useGlobalPipes(new ValidationPipe({ transform: true, stopAtFirstError: true }));
    // await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await app.close();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a profile', async () => {
      const createProfileDto: CreateProfileDto = {
        name: 'zoed',
        dateOfBirth: new Date(),
        height: 170,
        weight: 65,
        gender: GenderEnum.MALE,
      };
      const profile = await service.create(createProfileDto);
      expect(profile).toBeDefined();
      // Add more assertions as needed
    });
  });

  // describe('update', () => {
  //   it('should update a profile', async () => {
  //     const updateProfileDto: UpdateProfileDto = {
  //       name: 'Updated User',
  //     };
  //     const profile = await service.update('profileId', updateProfileDto);
  //     expect(profile).toBeDefined();
  //     // Add more assertions as needed
  //   });
  // });

  // Add more tests for findOne, remove, etc.
});
