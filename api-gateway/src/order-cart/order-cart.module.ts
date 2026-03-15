import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderCartController } from './order-cart.controller';
import { OrderCartService } from './order-cart.service';

@Module({
  imports: [HttpModule],
  controllers: [OrderCartController],
  providers: [OrderCartService]
})
export class OrderCartModule {}
