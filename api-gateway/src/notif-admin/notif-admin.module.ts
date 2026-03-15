import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotifAdminController } from './notif-admin.controller';
import { NotifAdminService } from './notif-admin.service';

@Module({
  imports: [HttpModule],
  controllers: [NotifAdminController],
  providers: [NotifAdminService]
})
export class NotifAdminModule {}
