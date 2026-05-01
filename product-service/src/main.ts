import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Triggering Azure Admin Deploy1
  const config = new DocumentBuilder()
    .setTitle('Product & Inventory Service')
    .setDescription('The Product microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3002);
  console.log(`Product & Inventory Service running on port 3002`);
}
bootstrap();
