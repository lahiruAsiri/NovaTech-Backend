import { Controller, Get, Delete, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AdminAdminService } from './admin-admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/admin-admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminAdminController {
  constructor(private readonly adminService: AdminAdminService) {}

  @Get('users')
  getAllUsers(@Request() req: any) {
    return this.adminService.getAllUsers(req.user);
  }

  @Delete('users/:id')
  deleteUser(@Request() req: any, @Param('id') id: string) {
    return this.adminService.deleteUser(req.user, Number(id));
  }

  @Patch('users/:id/role')
  updateRole(@Request() req: any, @Param('id') id: string, @Body('role') role: string) {
    return this.adminService.updateRole(req.user, Number(id), role);
  }
}
