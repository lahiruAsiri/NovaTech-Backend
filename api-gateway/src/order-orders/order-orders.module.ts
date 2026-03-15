import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderOrdersController } from './order-orders.controller';
import { OrderOrdersService } from './order-orders.service';

@Module({
  imports: [HttpModule],
  controllers: [OrderOrdersController],
  providers: [OrderOrdersService]
})
export class OrderOrdersModule {}
