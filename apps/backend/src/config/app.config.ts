import { registerAs } from '@nestjs/config';
import { AppConfig } from './app.config.type';

export default registerAs(
  'app',
  (): AppConfig => ({
    env: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    name: process.env.APP_NAME || 'my-app',
    port: parseInt(process.env.APP_PORT || '3000', 10),
    apiPrefix: process.env.APP_API_PREFIX || 'api',
  }),
);
