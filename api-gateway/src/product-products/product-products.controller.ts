import { Controller, Get, Post, Patch, Delete, Param, UseGuards, Request, Body } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ProductProductsService } from './product-products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/product-products')
export class ProductProductsController {
  constructor(private readonly productsService: ProductProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  addReview(@Request() req: any, @Param('id') id: string, @Body() body: any) {
    return this.productsService.addReview(req.user, Number(id), body);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Request() req: any, @Body() body: any) {
    return this.productsService.create(req.user, body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Request() req: any, @Param('id') id: string, @Body() body: any) {
    return this.productsService.update(req.user, Number(id), body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.productsService.remove(req.user, Number(id));
  }
}
