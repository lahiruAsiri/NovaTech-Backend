import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { InternalModule } from './internal/internal.module';
import { TemplatesModule } from './templates/templates.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, NotificationsModule, AdminModule, InternalModule, TemplatesModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
