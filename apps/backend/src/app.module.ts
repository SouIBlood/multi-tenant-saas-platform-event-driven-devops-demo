import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { HelloModule } from 'src/app/modules/hello/hello.module';
import appConfig from 'src/config/app.config';
import dbConfig from 'src/config/db.config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import authConfig from 'src/config/auth.config';
import type { Request } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, dbConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      path: '/graphql',
      context: ({ req }: { req: Request }) => ({ req }),
    }),

    HelloModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
