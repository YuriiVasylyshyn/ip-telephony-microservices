import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('/test-event')
  sendTest() {
    return this._authService.sendTestUserEvent();
  }
}
