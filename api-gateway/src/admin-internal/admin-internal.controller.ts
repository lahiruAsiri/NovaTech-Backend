import { Controller, Get, Param } from '@nestjs/common';
import { AdminInternalService } from './admin-internal.service';

@Controller('api/admin-internal')
export class AdminInternalController {
  constructor(private readonly internalService: AdminInternalService) {}

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.internalService.getProfile(Number(id));
  }
}
