import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminAdminModule } from './admin-admin/admin-admin.module';
import { ProductProductsModule } from './product-products/product-products.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductInternalModule } from './product-internal/product-internal.module';
import { OrderOrdersModule } from './order-orders/order-orders.module';
import { OrderCartModule } from './order-cart/order-cart.module';
import { OrderAdminModule } from './order-admin/order-admin.module';
import { OrderInternalModule } from './order-internal/order-internal.module';
import { NotifNotificationsModule } from './notif-notifications/notif-notifications.module';
import { NotifTemplatesModule } from './notif-templates/notif-templates.module';
import { NotifAdminModule } from './notif-admin/notif-admin.module';
import { NotifInternalModule } from './notif-internal/notif-internal.module';
import { AdminInternalModule } from './admin-internal/admin-internal.module';

@Module({
  imports: [
    AuthModule,
    AdminAuthModule,
    AdminUsersModule,
    AdminAdminModule,
    ProductProductsModule,
    ProductCategoriesModule,
    ProductInternalModule,
    OrderOrdersModule,
    OrderCartModule,
    OrderAdminModule,
    OrderInternalModule,
    NotifNotificationsModule,
    NotifTemplatesModule,
    NotifAdminModule,
    NotifInternalModule,
    AdminInternalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
