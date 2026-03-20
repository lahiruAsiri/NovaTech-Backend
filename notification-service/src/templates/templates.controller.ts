import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('templates')
@UseGuards(RolesGuard)
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) { }

    @Get(':type')
    getTemplate(@Param('type') type: string) { return this.templatesService.getTemplate(type); }

    @Post()
    @Roles('ADMIN')
    create(@Body() body: any) { return this.templatesService.create(body); }
}
