import { Config } from './config.interface';

export const configParser = (): Config => ({
  dbHost: process.env.DB_HOST!,
  dbPort: +process.env.DB_PORT!,
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  dbName: process.env.DB_NAME!,
  rabbitmq: process.env.RABBITMQ_URL!,
});
