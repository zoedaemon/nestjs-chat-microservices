import { Injectable, Logger } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile, ProfileDocument } from '../schemas/profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const { dateOfBirth, ...rest } = createProfileDto;
    this.logger.log(
      `User profile retrieved: ${JSON.stringify(createProfileDto, null, 2)}`,
    );
    const date = new Date(dateOfBirth);
    const createdUser = new this.profileModel({
      ...rest,
      dateOfBirth: date,
      horoscope: this.getHoroscope(date),
      zodiac: this.getZodiac(date.getFullYear()),
    });
    return createdUser.save();
  }

  findOne(id: number) {
    //TODO convertInchesToCm
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile ${updateProfileDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }

  private getHoroscope(dateOfBirth: Date): string {
    const month = dateOfBirth.getMonth() + 1; // Months are zero-based in JavaScript
    const day = dateOfBirth.getDate();
    switch (month) {
      case 1:
        return day < 20 ? 'Capricornus' : 'Aquarius';
      case 2:
        return day < 19 ? 'Aquarius' : 'Pisces';
      case 3:
        return day < 21 ? 'Pisces' : 'Aries';
      case 4:
        return day < 20 ? 'Aries' : 'Taurus';
      case 5:
        return day < 21 ? 'Taurus' : 'Gemini';
      case 6:
        return day < 21 ? 'Gemini' : 'Cancer';
      case 7:
        return day < 23 ? 'Cancer' : 'Leo';
      case 8:
        return day < 23 ? 'Leo' : 'Virgo';
      case 9:
        return day < 23 ? 'Virgo' : 'Libra';
      case 10:
        return day < 23 ? 'Libra' : 'Scorpius';
      case 11:
        return day < 22 ? 'Scorpius' : 'Sagittarius';
      case 12:
        return day < 22 ? 'Sagittarius' : 'Capricornus';
      default:
        return '';
    }
  }

  private getZodiac(year: number): string {
    const zodiacSigns = [
      'Monkey',
      'Rooster',
      'Dog',
      'Pig',
      'Rat',
      'Ox',
      'Tiger',
      'Rabbit',
      'Dragon',
      'Snake',
      'Horse',
      'Goat',
    ];
    return zodiacSigns[(year - 4) % 12];
  }
}
