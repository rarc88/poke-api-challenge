import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorators/public.decorator';

@ApiTags('test')
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'Welcome to the system' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ description: 'Check system status' })
  @Get('status')
  getStatus(): boolean {
    return this.appService.getStatus();
  }
}
