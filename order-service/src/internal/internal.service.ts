import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InternalService {
    constructor(private prisma: PrismaService) { }

    async getProductStats(productId: number) {
        const count = await this.prisma.orderItem.count({
            where: { productId }
        });
        return { productId, salesCount: count };
    }
}
