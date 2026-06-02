import { Module } from '@nestjs/common';
import { HelloResolver } from 'src/app/modules/hello/hello.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [HelloResolver],
})
export class HelloModule {}
