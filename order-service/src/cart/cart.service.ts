import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async getCart(userId: number) {
        return this.prisma.cart.findMany({ where: { userId } });
    }

    async addCart(userId: number, productId: number, quantity: number) {
        const existing = await this.prisma.cart.findFirst({ where: { userId, productId } });
        if (existing) {
            return this.prisma.cart.update({ where: { id: existing.id }, data: { quantity: existing.quantity + quantity } });
        }
        return this.prisma.cart.create({ data: { userId, productId, quantity } });
    }

    async updateCart(id: number, userId: number, quantity: number) {
        const item = await this.prisma.cart.findUnique({ where: { id } });
        if (!item || item.userId !== userId) throw new NotFoundException('Item not found');
        return this.prisma.cart.update({ where: { id }, data: { quantity } });
    }

    async removeCart(id: number, userId: number) {
        const item = await this.prisma.cart.findUnique({ where: { id } });
        if (!item || item.userId !== userId) throw new NotFoundException('Item not found');
        return this.prisma.cart.delete({ where: { id } });
    }
}
