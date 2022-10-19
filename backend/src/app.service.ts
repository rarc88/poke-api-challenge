import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Poke API Challenge!';
  }

  getStatus(): boolean {
    return true;
  }
}
