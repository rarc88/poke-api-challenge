import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth-guard.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Authentication in the system' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
