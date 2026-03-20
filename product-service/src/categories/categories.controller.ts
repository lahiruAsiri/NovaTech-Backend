import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('categories')
@UseGuards(RolesGuard)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    getAll() { return this.categoriesService.getAll(); }

    @Get(':id')
    getOne(@Param('id') id: string) { return this.categoriesService.getOne(Number(id)); }

    @Post()
    @Roles('ADMIN')
    create(@Body() body: any) { return this.categoriesService.create(body); }

    @Patch(':id')
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() body: any) { return this.categoriesService.update(Number(id), body); }

    @Delete(':id')
    @Roles('ADMIN')
    remove(@Param('id') id: string) { return this.categoriesService.delete(Number(id)); }
}
