import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/auth/user-auth.guard';
import { User } from 'src/auth/user.decorator';
import type { AuthUser } from 'src/auth/auth-user.type';

@Resolver()
export class HelloResolver {
  constructor() {}

  @Query(() => String)
  async hello(): Promise<string> {
    return Promise.resolve('Hello, World!');
  }

  @Query(() => String)
  @UseGuards(UserAuthGuard)
  async protectedHello(): Promise<string> {
    return Promise.resolve('Hello, protected world!');
  }

  @Query(() => String)
  @UseGuards(UserAuthGuard)
  async helloUser(@User() user: AuthUser): Promise<string> {
    const userId = user.nickname;
    return Promise.resolve(`Hello, ${userId}!`);
  }
}
