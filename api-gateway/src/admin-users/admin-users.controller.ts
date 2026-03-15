import { Controller, Get, Post, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/admin-users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUsersController {
  constructor(private readonly usersService: AdminUsersService) {}

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user);
  }

  @Get('profile/recommendations')
  getRecommendations(@Request() req: any) {
    return this.usersService.getRecommendations(req.user);
  }

  @Patch('profile/update')
  updateProfile(@Request() req: any, @Body() body: any) {
    return this.usersService.updateProfile(req.user, body);
  }

  @Get('address')
  getAddresses(@Request() req: any) {
    return this.usersService.getAddresses(req.user);
  }

  @Post('address')
  addAddress(@Request() req: any, @Body() body: any) {
    return this.usersService.addAddress(req.user, body);
  }

  @Get('admin/all')
  @Roles('ADMIN')
  getAllUsers(@Request() req: any) {
    return this.usersService.getAllUsers(req.user);
  }
}
