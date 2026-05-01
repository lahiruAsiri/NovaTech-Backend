import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('DEBUG: DATABASE_URL is', process.env.DATABASE_URL ? 'FOUND' : 'NOT FOUND');
  
  const app = await NestFactory.create(AppModule);
  // Triggering Azure Admin Deploy1
  const config = new DocumentBuilder()
    .setTitle('Admin & User Service')
    .setDescription('The Admin & User microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || process.env.WEBSITES_PORT || 3006;
  await app.listen(port, '0.0.0.0');
  console.log(`Admin & User Service running on port ${port}`);
}
bootstrap();
