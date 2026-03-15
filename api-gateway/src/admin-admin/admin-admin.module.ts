import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdminAdminController } from './admin-admin.controller';
import { AdminAdminService } from './admin-admin.service';

@Module({
  imports: [HttpModule],
  controllers: [AdminAdminController],
  providers: [AdminAdminService]
})
export class AdminAdminModule {}
