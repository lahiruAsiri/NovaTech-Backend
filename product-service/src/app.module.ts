import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { InternalModule } from './internal/internal.module';

@Module({
  imports: [PrismaModule, ProductsModule, CategoriesModule, InternalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
