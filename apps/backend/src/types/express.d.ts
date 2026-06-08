import type { AuthUser } from '../auth/auth-user.type';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
