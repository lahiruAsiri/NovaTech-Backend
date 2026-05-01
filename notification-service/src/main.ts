import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Triggering Azure Notification Deploy1
  const config = new DocumentBuilder()
    .setTitle('Notification & Audit Service')
    .setDescription('The Notification microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3004);
  console.log(`Notification & Audit Service running on port 3004`);
}
bootstrap();
