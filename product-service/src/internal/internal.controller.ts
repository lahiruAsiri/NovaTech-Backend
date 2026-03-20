import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { InternalService } from './internal.service';

@Controller('internal/stock')
export class InternalController {
    constructor(private readonly internalService: InternalService) { }

    @Get('check/:id')
    checkStock(@Param('id') id: string) {
        return this.internalService.checkStock(Number(id));
    }

    @Patch('reduce')
    reduceStock(@Body() body: { items: { productId: number; quantity: number }[] }) {
        return this.internalService.reduceStock(body.items);
    }
}
