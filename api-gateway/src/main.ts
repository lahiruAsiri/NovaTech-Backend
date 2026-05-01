import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // Triggering Azure Admin Deploy1
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API Gateway')
    .setDescription('Central API Gateway for the CTSE Microservices Assignment')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`API Gateway is running on: http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api/docs`);
}
bootstrap();
