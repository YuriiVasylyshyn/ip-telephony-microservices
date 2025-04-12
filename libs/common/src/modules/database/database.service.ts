import { Config } from 'libs/config';
import { Pool } from 'pg';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private _pool: Pool | null = null; // Пулу ще немає при створенні сервісу

  constructor(private readonly _configService: ConfigService<Config, true>) {}

  // Гетер, який ініціалізує пул при першому зверненні
  private get pool(): Pool {
    if (!this._pool) {
      this._pool = new Pool({
        host: this._configService.get('dbHost', { infer: true }),
        port: this._configService.get('dbPort', { infer: true }),
        user: this._configService.get('dbUser', { infer: true }),
        password: this._configService.get('dbPassword', { infer: true }),
        database: this._configService.get('dbName', { infer: true }),
      });
      console.log('PostgreSQL Pool initialized');
    }
    return this._pool;
  }

  public async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    try {
      const client = await this.pool.connect(); // Підключаємось при запиті
      try {
        const result = await client.query(sql, params);
        return result.rows as T[];
      } finally {
        client.release(); // Важливо звільнити клієнта
      }
    } catch (error) {
      console.error('Database query error:', error);
      throw new InternalServerErrorException('Database error');
    }
  }

  // Додатковий метод для закриття пула (наприклад, при зупинці додатка)
  public async closePool(): Promise<void> {
    if (this._pool) {
      await this._pool.end();
      this._pool = null;
      console.log('PostgreSQL Pool closed');
    }
  }
}
