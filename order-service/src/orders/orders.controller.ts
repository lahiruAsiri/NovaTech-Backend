import { Controller, Get, Post, Patch, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post('checkout')
    checkout(@Headers('x-user-id') userId: string) {
        return this.ordersService.checkout(Number(userId));
    }

    @Get('history')
    getHistory(@Headers('x-user-id') userId: string) {
        return this.ordersService.getHistory(Number(userId));
    }

    @Get(':id')
    getOne(@Param('id') id: string, @Headers('x-user-id') userId: string, @Headers('x-user-role') role: string) {
        return this.ordersService.getOne(Number(id), Number(userId), role);
    }

    @Patch(':id/cancel')
    cancelOrder(@Param('id') id: string, @Headers('x-user-id') userId: string) {
        return this.ordersService.cancelOrder(Number(id), Number(userId));
    }

    @Patch(':id/status')
    @Roles('ADMIN')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.ordersService.updateStatus(Number(id), status);
    }
}
