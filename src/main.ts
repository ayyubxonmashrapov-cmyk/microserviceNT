import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filter/all-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.API_PORT);
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
  );

  app.useGlobalFilters(new AllExceptionsFilter);
  await app.listen(port, () => console.log('api-gateway is runnin on port', port));
}
bootstrap(); 