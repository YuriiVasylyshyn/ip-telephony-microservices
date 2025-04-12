import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';

import { RmqService } from '@app/common';

@Injectable()
export class AuthService {
  private userClient: ClientProxy;

  constructor(private readonly rmqService: RmqService) {
    const options = this.rmqService.getOptions('telephony_queue', true);
    this.userClient = ClientProxyFactory.create(options);
  }

  public sendTestUserEvent(): void {
    const payload = {
      name: 'Test User',
      phone: '380991112133',
    };

    this.userClient.emit('user.registered', payload);
  }
}
