import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('sales-report')
    getSalesReport() {
        return this.adminService.getSalesReport();
    }

    @Get('orders')
    getAllOrders() {
        return this.adminService.getAllOrders();
    }

    @Patch('orders/:id/status')
    updateOrderStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.adminService.updateOrderStatus(Number(id), status);
    }
}
