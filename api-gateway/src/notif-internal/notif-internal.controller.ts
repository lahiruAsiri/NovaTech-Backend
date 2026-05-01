import { Controller, Post, Body } from '@nestjs/common';
import { NotifInternalService } from './notif-internal.service';

@Controller('api/notif-internal')
export class NotifInternalController {
  constructor(private readonly internalService: NotifInternalService) {}

  @Post('log-event')
  logEvent(@Body() body: any) {
    return this.internalService.logEvent(body);
  }

  @Post('send-email')
  sendEmail(@Body() body: any) {
    return this.internalService.sendEmail(body);
  }

  @Post('stock-alert')
  sendStockAlert(@Body() body: any) {
    return this.internalService.sendStockAlert(body);
  }
}
