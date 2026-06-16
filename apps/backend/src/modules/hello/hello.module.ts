import { Module } from '@nestjs/common';
import { HelloResolver } from 'src/modules/hello/hello.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [HelloResolver],
})
export class HelloModule {}
