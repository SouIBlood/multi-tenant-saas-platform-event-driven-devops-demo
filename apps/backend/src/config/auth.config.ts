import { registerAs } from '@nestjs/config';
import { AuthConfig } from 'src/config/auth.config.type';

export default registerAs(
  'auth',
  (): AuthConfig => ({
    domain: process.env.AUTH0_DOMAIN || '',
    clientId: process.env.AUTH0_CLIENT_ID || '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
  }),
);
