import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InternalService {
    constructor(private prisma: PrismaService) { }

    async checkStock(productId: number) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new BadRequestException('Product not found');
        return { stock: product.stock };
    }

    async reduceStock(items: { productId: number; quantity: number }[]) {
        return this.prisma.$transaction(async (tx) => {
            for (const item of items) {
                const product = await tx.product.findUnique({ where: { id: item.productId } });
                if (!product || product.stock < item.quantity) {
                    throw new BadRequestException(`Insufficient stock for product ID ${item.productId}`);
                }
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: product.stock - item.quantity }
                });
                await tx.inventoryLog.create({
                    data: { productId: item.productId, change: -item.quantity, reason: 'Order Placed' }
                });
            }
            return { message: 'Stock reduced successfully' };
        });
    }
}
