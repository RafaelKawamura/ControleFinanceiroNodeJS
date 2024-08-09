import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // activate "Validation Pipes"
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Allow CORS for all routes
  app.enableCors();
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
bootstrap();
