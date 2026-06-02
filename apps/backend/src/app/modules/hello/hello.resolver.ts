import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
  constructor() {}

  @Query(() => String)
  async hello(): Promise<string> {
    return Promise.resolve('Hello, World!');
  }
}
