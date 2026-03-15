import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderAdminController } from './order-admin.controller';
import { OrderAdminService } from './order-admin.service';

@Module({
  imports: [HttpModule],
  controllers: [OrderAdminController],
  providers: [OrderAdminService]
})
export class OrderAdminModule {}
