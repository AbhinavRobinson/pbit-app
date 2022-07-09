import { NestFactory } from '@nestjs/core';
import configuration from 'config/configuration';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(helmet());
  await app.listen(configuration().port);
}
bootstrap();
