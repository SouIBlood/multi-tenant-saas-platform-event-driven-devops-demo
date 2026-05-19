import { registerAs } from '@nestjs/config';
import { AppConfig } from './app.config.type';

export default registerAs(
  'app',
  (): AppConfig => ({
    name: process.env.APP_NAME || 'my-app',
    env: process.env.APP_NODE_ENV || 'development',
    port: parseInt(process.env.APP_PORT || '3000', 10),
    apiPrefix: process.env.APP_API_PREFIX || 'api',
  }),
);
