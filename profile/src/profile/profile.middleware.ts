import {
  Injectable,
  NestMiddleware,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ProfileMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    // Extract the access token from the request headers
    const token = req.headers.authorization?.replace('Bearer ', '');
    this.logger.log(`Middleware: ${JSON.stringify(req.headers, null, 2)}`);

    if (token) {
      try {
        // Decode the access token
        const decoded: any = jwt.verify(token, 'sso3XcQU1QMCpcfUi3wvC'); //process.env.JWT_SECRET
        // Extract the user ID from the decoded token payload
        const userId = decoded.sub; // Assuming the user ID is stored in the 'sub' claim

        // Attach the user ID to the request object for use in subsequent middleware or route handlers
        req['userId'] = userId;

        this.logger.log(
          `Got userId In Middleware: ${JSON.stringify(decoded, null, 2)}`,
        );

        next();
      } catch (error) {
        // Handle token verification errors (e.g., expired token, invalid signature, etc.)
        this.logger.warn('Error decoding token:', error.message);
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
