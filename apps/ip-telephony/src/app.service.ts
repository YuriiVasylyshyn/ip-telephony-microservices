import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@app/common';
import { SaveCallDetailsDto } from './dtos/save-call-details.dto';
import { SaveUserDto } from './dtos/save-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly _dbService: DatabaseService) {}

  async saveCallDetails(data: SaveCallDetailsDto) {
    const query = `
      INSERT INTO call_logs (event_type, caller_id, callee_id, timestamp, raw_data)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [data.eventType, data.callerId, data.calleeId, new Date(), data.rawData];
    await this._dbService.query(query, values);
  }

  async saveUser(data: SaveUserDto) {
    const { phone, username } = data;
    const query = `
      INSERT INTO users (username, phone)
      VALUES ($1, $2)
    `;
    const values = [username, phone];
    await this._dbService.query(query, values);
  }
}
