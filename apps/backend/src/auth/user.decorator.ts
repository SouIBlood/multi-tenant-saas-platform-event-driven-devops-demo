import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthUser } from './auth-user.type';
import { getGqlRequestFromContext } from 'src/helpers/http.helper';

/**
 * Custom decorator to extract user information from GraphQL context.
 * Can be used with or without a property name.
 *
 * @example
 * // Get entire user object
 * @User() user: AuthUser
 *
 * @example
 * // Get specific user property
 * @User('sub') userId: string
 */
export const User = createParamDecorator(
  (
    data: string | undefined,
    context: ExecutionContext,
  ): AuthUser | undefined => {
    const req = getGqlRequestFromContext(context);
    const user = req.user;

    if (!user) {
      return undefined;
    }

    return user;
  },
);
