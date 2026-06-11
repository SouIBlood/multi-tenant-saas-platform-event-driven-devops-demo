import { registerAs } from '@nestjs/config';
import { PusherConfig } from './pusher.config.type';

export default registerAs(
  'pusher',
  (): PusherConfig => ({
    appId: process.env.PUSHER_APP_ID || '',
    key: process.env.PUSHER_KEY || '',
    secret: process.env.PUSHER_SECRET || '',
    cluster: process.env.PUSHER_CLUSTER || 'mt1',
    encrypted: process.env.PUSHER_ENCRYPTED !== 'false',
  }),
);
