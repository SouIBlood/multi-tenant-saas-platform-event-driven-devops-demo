import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import authConfig from 'src/config/auth.config';
import { ConfigService, type ConfigType } from '@nestjs/config';
import { getGqlRequestFromContext } from 'src/helpers/http.helper';
import type { AuthUser } from './auth-user.type';

@Injectable()
export class UserAuthGuard implements CanActivate {
  private readonly logger = new Logger(UserAuthGuard.name);
  private readonly cfg: ConfigType<typeof authConfig>;

  constructor(private readonly configService: ConfigService) {
    this.cfg = this.configService.getOrThrow('auth');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = getGqlRequestFromContext(context);
    const headers = req.headers;

    const auth = headers.authorization;
    if (!auth || typeof auth !== 'string') {
      return false;
    }

    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return false;
    }
    const token = parts[1];

    try {
      const userInfo = await this.verifyTokenWithAuth0(token);
      req.user = userInfo;
      return true;
    } catch (err) {
      this.logger.warn(`Auth verification failed: ${err}`);
      return false;
    }
  }

  private async verifyTokenWithAuth0(token: string): Promise<AuthUser> {
    if (!this.cfg.domain) {
      throw new Error('Auth0 domain not configured');
    }

    const url = `https://${this.cfg.domain}/userinfo`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        scope: 'openid profile email',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Auth0 verification failed: ${response.status} ${response.statusText}`,
      );
    }

    const userInfo = (await response.json()) as AuthUser;
    return userInfo;
  }
}
