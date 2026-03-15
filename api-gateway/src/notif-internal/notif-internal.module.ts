import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotifInternalController } from './notif-internal.controller';
import { NotifInternalService } from './notif-internal.service';

@Module({
  imports: [HttpModule],
  controllers: [NotifInternalController],
  providers: [NotifInternalService]
})
export class NotifInternalModule {}
