import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //run deploiyng pipeline 1
  const config = new DocumentBuilder()
    .setTitle('Product Service')
    .setDescription('The Product microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || process.env.WEBSITES_PORT || 3002;
  await app.listen(port, '0.0.0.0');
  console.log(`Product Service running on port ${port}`);
}
bootstrap();
