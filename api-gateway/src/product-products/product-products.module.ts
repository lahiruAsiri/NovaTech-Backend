import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductProductsController } from './product-products.controller';
import { ProductProductsService } from './product-products.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductProductsController],
  providers: [ProductProductsService]
})
export class ProductProductsModule {}
