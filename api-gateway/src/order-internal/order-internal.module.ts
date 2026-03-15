import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderInternalController } from './order-internal.controller';
import { OrderInternalService } from './order-internal.service';

@Module({
  imports: [HttpModule],
  controllers: [OrderInternalController],
  providers: [OrderInternalService]
})
export class OrderInternalModule {}
