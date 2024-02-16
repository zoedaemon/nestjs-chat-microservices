import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  
  // @Length(8, 100)
  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}
