import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { NotifAdminService } from './notif-admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/notif-admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class NotifAdminController {
  constructor(private readonly adminService: NotifAdminService) {}

  @Get('audit-logs')
  getAuditLogs(@Request() req: any) {
    return this.adminService.getAuditLogs(req.user);
  }
}
