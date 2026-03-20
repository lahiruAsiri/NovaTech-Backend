import { Controller, Post, Body } from '@nestjs/common';
import { InternalService } from './internal.service';

@Controller('notifications/internal')
export class InternalController {
    constructor(private readonly internalService: InternalService) { }

    @Post('log-event')
    logEvent(@Body() body: any) {
        return this.internalService.logEvent(body.service, body.action, body.details);
    }

    @Post('stock-alert')
    handleStockAlert(@Body() body: any) {
        return this.internalService.handleStockAlert(body.productId, body.stock);
    }
}
