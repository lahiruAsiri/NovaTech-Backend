import { Controller, Get, Delete, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('users')
    getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Delete('users/:id')
    deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(Number(id));
    }

    @Patch('users/:id/role')
    updateRole(@Param('id') id: string, @Body('role') role: string) {
        return this.adminService.updateRole(Number(id), role);
    }
}
