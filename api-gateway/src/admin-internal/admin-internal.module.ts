import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdminInternalService } from './admin-internal.service';
import { AdminInternalController } from './admin-internal.controller';

@Module({
  imports: [HttpModule],
  controllers: [AdminInternalController],
  providers: [AdminInternalService],
})
export class AdminInternalModule {}
