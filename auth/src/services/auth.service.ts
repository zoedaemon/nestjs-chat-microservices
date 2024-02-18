import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../interfaces/dto/register.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, inputPassword: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && bcrypt.compareSync(inputPassword, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._doc._id };
    this.logger.log(
      `Logging in: ${JSON.stringify(payload, null, 2)}`,
    );
    return {
      access_token: this.jwtService.sign(payload),
      id: user._doc._id,
    };
  }

  async register(registerDto: RegisterDto): Promise<UserDocument> {
    const { username, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersService.findByUsernameOrEmail(username, email );
    if (existingUser != null) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    
    // Create new user document using the Mongoose model
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;
    // Create new user
    return await this.usersService.createUser(newUser);
  }

}
