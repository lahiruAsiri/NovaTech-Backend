import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('audit-logs')
    getAuditLogs() {
        return this.adminService.getAuditLogs();
    }

    @Get('failed-notifications')
    getFailedNotifications() {
        return this.adminService.getFailedNotifications();
    }
}
