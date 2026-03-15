import { Controller, Get, Post, Patch, Delete, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('cart')
@UseGuards(RolesGuard)
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    getCart(@Headers('x-user-id') userId: string) {
        return this.cartService.getCart(Number(userId));
    }

    @Post('add')
    addCart(@Headers('x-user-id') userId: string, @Body() body: any) {
        return this.cartService.addCart(Number(userId), body.productId, body.quantity);
    }

    @Patch(':id/quantity')
    updateCart(@Param('id') id: string, @Headers('x-user-id') userId: string, @Body() body: any) {
        return this.cartService.updateCart(Number(id), Number(userId), body.quantity);
    }

    @Delete(':id')
    removeCart(@Param('id') id: string, @Headers('x-user-id') userId: string) {
        return this.cartService.removeCart(Number(id), Number(userId));
    }
}
