import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { GenderEnum, MeasurementSystemEnum } from '../schemas/profile.schema';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsDate()
  readonly dateOfBirth: Date;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsOptional()
  @IsEnum(MeasurementSystemEnum)
  readonly measurementSystem?: MeasurementSystemEnum;

  @IsOptional()
  @IsNumber()
  readonly height?: number;

  @IsOptional()
  @IsNumber()
  readonly weight?: number;
}
