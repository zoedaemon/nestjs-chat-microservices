import { IsString, IsEmail, IsNotEmpty, MinLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  // @Length(8, 100)
  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}
