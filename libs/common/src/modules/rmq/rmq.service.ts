import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

import { Config } from '@app/config';

@Injectable()
export class RmqService {
  constructor(private readonly _configService: ConfigService<Config, true>) {}

  public getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this._configService.get<string>('rabbitmq', { infer: true })],
        queue,
        noAck,
      },
    };
  }
}
