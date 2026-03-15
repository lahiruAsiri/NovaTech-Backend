import { Controller, Get, Post, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { OrderOrdersService } from './order-orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/order-orders')
@UseGuards(JwtAuthGuard)
export class OrderOrdersController {
  constructor(private readonly ordersService: OrderOrdersService) {}

  @Post('checkout')
  checkout(@Request() req: any) {
    return this.ordersService.checkout(req.user);
  }

  @Get('history')
  getHistory(@Request() req: any) {
    return this.ordersService.getHistory(req.user);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.findOne(req.user, Number(id));
  }

  @Patch(':id/cancel')
  cancelOrder(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.cancelOrder(req.user, Number(id));
  }
}
