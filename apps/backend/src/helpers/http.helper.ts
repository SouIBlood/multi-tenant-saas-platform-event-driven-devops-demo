import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

export const getGqlRequestFromContext = (
  context: ExecutionContext,
): Request => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext<{ req: Request }>();

  return req;
};
