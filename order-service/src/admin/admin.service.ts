import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getSalesReport() {
        const orders = await this.prisma.order.findMany({
            where: { status: 'CONFIRMED' },
            include: { transaction: true }
        });

        const totalRevenue = orders.reduce((sum, o) => sum + (o.transaction?.amount || 0), 0);
        return {
            totalOrders: orders.length,
            totalRevenue
        };
    }

    async getAllOrders() {
        return this.prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { transaction: true }
        });
    }

    async updateOrderStatus(id: number, status: any) {
        return this.prisma.order.update({
            where: { id },
            data: { status }
        });
    }
}
