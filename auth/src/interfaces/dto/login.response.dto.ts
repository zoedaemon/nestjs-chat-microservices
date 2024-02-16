import { IsString, IsEmail, IsNotEmpty, MinLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
