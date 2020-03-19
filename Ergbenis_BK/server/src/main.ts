import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import DbRepository from './db.repository';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const db = await app.get(DbRepository);
  await db.initializeDatabase(path.join(__dirname, '..', 'db.json'));

  await app.listen(4000);
}
bootstrap();
