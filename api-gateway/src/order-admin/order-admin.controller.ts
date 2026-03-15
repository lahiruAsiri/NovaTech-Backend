import { Controller, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { OrderAdminService } from './order-admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/order-admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class OrderAdminController {
  constructor(private readonly adminService: OrderAdminService) {}

  @Get('sales-report')
  getSalesReport(@Request() req: any) {
    return this.adminService.getSalesReport(req.user);
  }

  @Get()
  getAllOrders(@Request() req: any) {
    return this.adminService.getAllOrders(req.user);
  }

  @Patch(':id/status')
  updateOrderStatus(@Request() req: any, @Param('id') id: string, @Body('status') status: string) {
    return this.adminService.updateOrderStatus(req.user, Number(id), status);
  }
}
