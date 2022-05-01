import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

import * as path from 'path';
import { config } from 'dotenv';

config({
  path: path.resolve(__dirname + '/./../config/.env'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
