import { NestFactory } from '@nestjs/core';
// Triggering Azure Deployment Migration & Snyk Scan Fix
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Triggering Azure Admin Deploy1
  const config = new DocumentBuilder()
    .setTitle('Order & Payment Service')
    .setDescription('The Order microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3003);
  console.log(`Order & Payment Service running on port 3003`);
}
bootstrap();
