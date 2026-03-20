import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TemplatesService {
    constructor(private prisma: PrismaService) { }
    async getTemplate(type: string) { return this.prisma.template.findUnique({ where: { type } }); }
    async create(data: any) { return this.prisma.template.create({ data }); }
}
