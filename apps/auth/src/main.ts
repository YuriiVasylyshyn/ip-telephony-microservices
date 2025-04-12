import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { RmqService } from '@app/common';
import { Config } from '@app/config';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = app.get<ConfigService<Config, true>>(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  // ✅ Підключаємо RabbitMQ
  app.connectMicroservice(rmqService.getOptions('telephony_queue', false));
  await app.startAllMicroservices();

  await app.listen(config.get('port', { infer: true }));
}

bootstrap().catch(() => process.exit(1));
