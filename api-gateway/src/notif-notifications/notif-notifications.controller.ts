import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { NotifNotificationsService } from './notif-notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/notif-notifications')
@UseGuards(JwtAuthGuard)
export class NotifNotificationsController {
  constructor(private readonly notifService: NotifNotificationsService) {}

  @Get('my-inbox')
  getInbox(@Request() req: any) {
    return this.notifService.getInbox(req.user);
  }

  @Post('send-email')
  sendEmail(@Request() req: any, @Body() body: any) {
    return this.notifService.sendEmail(req.user, body);
  }

  @Patch(':id/read')
  markRead(@Request() req: any, @Param('id') id: string) {
    return this.notifService.markRead(req.user, Number(id));
  }
}
