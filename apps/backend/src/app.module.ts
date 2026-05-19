import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import appConfig from 'src/config/app.config';
import dbConfig from 'src/config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
