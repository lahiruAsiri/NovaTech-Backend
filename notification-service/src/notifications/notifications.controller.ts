import { Controller, Get, Post, Patch, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('notifications')
@UseGuards(RolesGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post('send-email')
    sendEmail(@Body() body: any) {
        return this.notificationsService.sendEmail(body.userId, body.subject, body.body);
    }

    @Post('send-sms')
    sendSms(@Body() body: any) {
        return this.notificationsService.sendSms(body.userId, body.message);
    }

    @Get('my-inbox')
    getMyInbox(@Headers('x-user-id') userId: string) {
        return this.notificationsService.getMyInbox(Number(userId));
    }

    @Patch(':id/read')
    markRead(@Param('id') id: string) {
        return this.notificationsService.markRead(Number(id));
    }
}
