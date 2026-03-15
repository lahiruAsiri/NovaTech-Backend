import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderInternalService } from './order-internal.service';

@Controller('api/order-internal')
export class OrderInternalController {
  constructor(private readonly internalService: OrderInternalService) {}

  @Post('log')
  logOrderEvent(@Body() body: any) {
    return this.internalService.logOrderEvent(body);
  }

  @Get('stats/:productId')
  getProductStats(@Param('productId') productId: string) {
    return this.internalService.getProductStats(Number(productId));
  }
}
