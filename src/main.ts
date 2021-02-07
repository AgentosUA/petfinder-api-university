import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv'

config({
  path: path.resolve(__dirname + '/./../config/.env')
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
