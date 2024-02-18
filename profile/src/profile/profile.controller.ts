import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  Logger,
} from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    this.logger.log(`User profile retrieved: ${req['userId']}`);
    try {
      if (createProfileDto.userId != req['userId']) {
        throw new HttpException(
          'unauthorized token for userId or userId is not set',
          HttpStatus.BAD_REQUEST,
        );
      }
      createProfileDto.userId = req['userId'];
      return await this.profileService.create(createProfileDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
