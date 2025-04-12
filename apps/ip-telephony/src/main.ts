import { NestFactory } from '@nestjs/core';

import { RmqService } from '@app/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('telephony_queue', false));
  await app.startAllMicroservices();
}

bootstrap().catch(() => process.exit(1));
