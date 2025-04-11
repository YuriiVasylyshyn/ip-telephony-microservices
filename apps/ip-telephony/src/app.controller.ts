import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { SaveCallDetailsDto } from './dtos/save-call-details.dto';
import { SaveUserDto } from './dtos/save-user.dto';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @EventPattern('call.details')
  async handleCallDetails(@Payload() data: SaveCallDetailsDto) {
    console.log('Received call details:', data);
    await this._appService.saveCallDetails(data);
  }

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() data: SaveUserDto) {
    console.log('Received user data:', data);
    await this._appService.saveUser(data);
  }
}
