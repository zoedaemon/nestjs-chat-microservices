import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './interfaces/dto/register.dto';


class Response {
  status: string;
  statusCode: number;
  message: string | string[];
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  
  // @UsePipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<Response> {
    try {
      const responseOK = new Response();
      const user = await this.authService.register(registerDto);
      responseOK.status = "OK";
      responseOK.statusCode = 200;
      responseOK.message = user.username+" created";
      return responseOK
    } catch (error) {
      const responseFail = new Response();
      responseFail.status = "ERROR";
      responseFail.message = error.message;
      responseFail.statusCode = HttpStatus.BAD_REQUEST;
      throw new HttpException(responseFail, HttpStatus.BAD_REQUEST);
    }
  }
}
