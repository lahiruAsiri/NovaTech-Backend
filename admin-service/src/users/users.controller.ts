import { Controller, Get, Post, Patch, Body, Headers, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('profile')
    getProfile(@Headers('x-user-id') userId: string) {
        return this.usersService.getProfile(Number(userId));
    }

    @Get('profile/recommendations')
    getRecommendations(@Headers('x-user-id') userId: string) {
        return this.usersService.getRecommendedProducts(Number(userId));
    }

    @Patch('profile/update')
    updateProfile(@Headers('x-user-id') userId: string, @Body() body: any) {
        return this.usersService.updateProfile(Number(userId), body);
    }

    @Post('address')
    addAddress(@Headers('x-user-id') userId: string, @Body() body: any) {
        return this.usersService.addAddress(Number(userId), body);
    }

    @Get('address/:id')
    getAddress(@Headers('x-user-id') userId: string, @Param('id') id: string) {
        return this.usersService.getAddress(Number(userId), Number(id));
    }
}
