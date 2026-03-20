import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async getAll() { return this.prisma.category.findMany(); }
    async getOne(id: number) { return this.prisma.category.findUnique({ where: { id } }); }
    async create(data: any) { return this.prisma.category.create({ data }); }
    async update(id: number, data: any) { return this.prisma.category.update({ where: { id }, data }); }
    async delete(id: number) { return this.prisma.category.delete({ where: { id } }); }
}
