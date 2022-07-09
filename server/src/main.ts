import { NestFactory } from '@nestjs/core';
import configuration from 'config/configuration';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(helmet());
  app.use(csurf());
  await app.listen(configuration().port);
}
bootstrap();
