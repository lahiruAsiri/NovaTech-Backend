import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrderCartService } from './order-cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/order-cart')
@UseGuards(JwtAuthGuard)
export class OrderCartController {
  constructor(private readonly cartService: OrderCartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user);
  }

  @Post('add')
  addToCart(@Request() req: any, @Body() body: any) {
    return this.cartService.addToCart(req.user, body);
  }

  @Patch(':id/quantity')
  updateQuantity(@Request() req: any, @Param('id') id: string, @Body() body: any) {
    return this.cartService.updateQuantity(req.user, Number(id), body.quantity);
  }

  @Delete(':id')
  removeFromCart(@Request() req: any, @Param('id') id: string) {
    return this.cartService.removeFromCart(req.user, Number(id));
  }
}
