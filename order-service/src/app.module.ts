import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { AdminModule } from './admin/admin.module';
import { InternalModule } from './internal/internal.module';

@Module({
  imports: [PrismaModule, OrdersModule, CartModule, AdminModule, InternalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
