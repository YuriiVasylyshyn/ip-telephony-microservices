import { Config } from 'libs/config';
import { Client } from 'pg';
import { Injectable, InternalServerErrorException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private _client: Client;

  constructor(private readonly _configService: ConfigService<Config, true>) {}

  public async onModuleInit() {
    this._client = new Client({
      host: this._configService.get('dbHost', { infer: true }),
      port: this._configService.get('dbPort', { infer: true }),
      user: this._configService.get('dbUser', { infer: true }),
      password: this._configService.get('dbPassword', { infer: true }),
      database: this._configService.get('dbName', { infer: true }),
    });

    await this._client.connect();
    console.log('Connected to PostgreSQL');
  }

  public async onModuleDestroy() {
    await this._client.end();
  }

  public async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    try {
      const result = await this._client.query(sql, params);
      return result.rows as T[];
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
