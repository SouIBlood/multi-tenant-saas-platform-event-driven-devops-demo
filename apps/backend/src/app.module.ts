import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloModule } from 'src/app/modules/hello/hello.module';
import appConfig from 'src/config/app.config';
import authConfig from 'src/config/auth.config';
import dbConfig from 'src/config/db.config';
import redisConfig from 'src/config/redis.config';
import pusherConfig from 'src/config/pusher.config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { Request } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, dbConfig, redisConfig, pusherConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('db.host'),
        port: configService.getOrThrow<number>('db.port'),
        username: configService.getOrThrow<string>('db.username'),
        password: configService.getOrThrow<string>('db.password'),
        database: configService.getOrThrow<string>('db.database'),
        ssl:
          configService.get<boolean>('db.ssl') === true
            ? {
                ca: configService.get<string>('db.ca') || undefined,
              }
            : false,
        logging: configService.get('db.logging') === true,
        synchronize: configService.get('app.env') === 'development',
        autoLoadEntities: true,
      }),
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
