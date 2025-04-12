import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@app/common';
import { SaveCallDetailsDto } from './dtos/save-call-details.dto';
import { SaveUserDto } from './dtos/save-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly _dbService: DatabaseService) {
    console.log('DatabaseService injected:', !!_dbService);
  }

  async saveCallDetails(data: SaveCallDetailsDto) {
    const query = `
      INSERT INTO call_logs (event_type, caller_id, callee_id, timestamp, raw_data)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [data.eventType, data.callerId, data.calleeId, new Date(), data.rawData];
    await this._dbService.query(query, values);
  }

  async saveUser(data: SaveUserDto) {
    const { phone, name } = data;
    const query = `
      INSERT INTO users (name, phone_number)
      VALUES ($1, $2)
    `;
    const values = [name, phone];
    await this._dbService.query(query, values);
  }
}
