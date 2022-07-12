import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor() {}

  private external_path() {
    join(__dirname, '..');
  }
}
