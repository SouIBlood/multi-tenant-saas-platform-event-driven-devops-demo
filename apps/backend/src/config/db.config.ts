import { registerAs } from '@nestjs/config';
import { DbConfig } from './db.config.type';

export default registerAs(
  'db',
  (): DbConfig => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'app_db',
    logging: process.env.DB_LOGGING === 'true',
  }),
);
