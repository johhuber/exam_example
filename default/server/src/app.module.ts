import { AuthMiddleware } from './auth.middleware';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import DbRepository from './db.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DbRepository],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
