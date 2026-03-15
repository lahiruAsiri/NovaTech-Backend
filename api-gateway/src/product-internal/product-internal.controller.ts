import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ProductInternalService } from './product-internal.service';

@Controller('api/product-internal')
export class ProductInternalController {
  constructor(private readonly internalService: ProductInternalService) {}

  @Get('stock/check/:id')
  checkStock(@Param('id') id: string) {
    return this.internalService.checkStock(Number(id));
  }

  @Patch('stock/reduce')
  reduceStock(@Body() body: any) {
    return this.internalService.reduceStock(body.items);
  }
}
