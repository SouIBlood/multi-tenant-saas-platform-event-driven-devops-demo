import { registerAs } from '@nestjs/config';
import { DbConfig } from './db.config.type';

export default registerAs(
  'db',
  (): DbConfig => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'erp_db',
    logging: process.env.DB_LOGGING === 'true',
    ssl: process.env.DB_SSL === 'true',
    ca: process.env.DB_CA ? process.env.DB_CA.replace(/\\n/g, '\n') : undefined,
  }),
);
