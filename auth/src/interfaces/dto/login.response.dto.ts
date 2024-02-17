import { IsString, IsEmail, IsNotEmpty, MinLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: '@access_token will be used to access other microservices, will be expired on 1 hour' })
  @IsNotEmpty()
  @IsString()
  access_token: string;

  
  @ApiProperty({ description: '@id is userId, will match with related @access_token' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
