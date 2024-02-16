import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './interfaces/dto/register.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiConflictResponse, ApiBadRequestResponse, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './interfaces/dto/login.dto';
import { LoginResponseDto } from './interfaces/dto/login.response.dto';
import { RegisterResponseDto } from './interfaces/dto/register.response.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Logging in the user" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Successful login', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: RegisterResponseDto })
  @ApiConflictResponse({ description: 'Username or email already exists' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  // @UsePipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    try {
      const responseOK = new RegisterResponseDto();
      const user = await this.authService.register(registerDto);
      responseOK.status = "OK";
      responseOK.statusCode = 200;
      responseOK.message = user.username+" created";
      return responseOK
    } catch (error) {
      const responseFail = new RegisterResponseDto();
      responseFail.status = "ERROR";
      responseFail.message = error.message;
      responseFail.statusCode = HttpStatus.BAD_REQUEST;
      throw new HttpException(responseFail, HttpStatus.BAD_REQUEST);
    }
  }
}
