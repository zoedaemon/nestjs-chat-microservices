import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDocs(): string {
    return '<a href="http://localhost:3002/api">API Documentations</>';
  }
}
