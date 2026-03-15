import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { NotifTemplatesService } from './notif-templates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/notif-templates')
export class NotifTemplatesController {
  constructor(private readonly templatesService: NotifTemplatesService) {}

  @Get(':type')
  getTemplate(@Param('type') type: string) {
    return this.templatesService.getTemplate(type);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Request() req: any, @Body() body: any) {
    return this.templatesService.create(req.user, body);
  }
}
