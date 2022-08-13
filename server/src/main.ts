import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from 'utils/configuration';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('PBIT API')
    .setDescription('This is the api docs for the polygon buidlit project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configuration().port);
}
bootstrap();
