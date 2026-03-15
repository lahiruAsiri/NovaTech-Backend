import { Controller, Get, Param } from '@nestjs/common';
import { InternalService } from './internal.service';

@Controller('internal')
export class InternalController {
    constructor(private readonly internalService: InternalService) { }

    @Get('stats/:productId')
    getProductStats(@Param('productId') productId: string) {
        return this.internalService.getProductStats(Number(productId));
    }
}
