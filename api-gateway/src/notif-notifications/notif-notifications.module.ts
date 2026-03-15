import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotifNotificationsController } from './notif-notifications.controller';
import { NotifNotificationsService } from './notif-notifications.service';

@Module({
  imports: [HttpModule],
  controllers: [NotifNotificationsController],
  providers: [NotifNotificationsService]
})
export class NotifNotificationsModule {}
