import { IsString, IsNotEmpty, IsNumber, IsArray} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
  
  // @Length(8, 100)
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsArray()
  message: string;
}
