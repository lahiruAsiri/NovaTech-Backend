import { Controller, Get, Post, Patch, Delete, Body, Headers, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getAll() { return this.productsService.getAll(); }

    @Get(':id')
    getOne(@Param('id') id: string) { return this.productsService.getOne(Number(id)); }

    @Post()
    @Roles('ADMIN')
    create(@Body() body: any) { return this.productsService.create(body); }

    @Patch(':id')
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() body: any) { return this.productsService.update(Number(id), body); }

    @Delete(':id')
    @Roles('ADMIN')
    remove(@Param('id') id: string) { return this.productsService.delete(Number(id)); }

    @Get(':id/reviews')
    getReviews(@Param('id') id: string) { return this.productsService.getReviews(Number(id)); }

    @Post(':id/reviews')
    addReview(@Param('id') id: string, @Headers('x-user-id') userId: string, @Body() body: any) {
        return this.productsService.addReview(Number(id), Number(userId), body);
    }
}
