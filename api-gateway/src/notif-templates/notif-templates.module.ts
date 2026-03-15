import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotifTemplatesController } from './notif-templates.controller';
import { NotifTemplatesService } from './notif-templates.service';

@Module({
  imports: [HttpModule],
  controllers: [NotifTemplatesController],
  providers: [NotifTemplatesService]
})
export class NotifTemplatesModule {}
