import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductInternalController } from './product-internal.controller';
import { ProductInternalService } from './product-internal.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductInternalController],
  providers: [ProductInternalService]
})
export class ProductInternalModule {}
