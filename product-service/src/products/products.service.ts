import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService, private httpService: HttpService) { }

    async getAll() { return this.prisma.product.findMany({ include: { category: true } }); }

    async getOne(id: number) {
        const product: any = await this.prisma.product.findUnique({ where: { id }, include: { category: true, reviews: true } });
        if (!product) throw new NotFoundException('Product not found');
        
        // Inter-service call: Check sales statistics from Order Service
        try {
            const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
            const stats = await lastValueFrom(this.httpService.get(`${gatewayUrl}/api/order-internal/stats/${id}`));
            product.isTrending = stats.data.salesCount > 2; // Arbitrary trending threshold
        } catch (e) {
            console.error('Failed to fetch product stats', e?.message);
            product.isTrending = false;
        }
        
        return product;
    }

    async create(data: any) { return this.prisma.product.create({ data }); }

    async update(id: number, data: any) {
        const p = await this.prisma.product.update({ where: { id }, data });
        if (data.stock !== undefined && data.stock < 10) {
            try {
                const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
                await lastValueFrom(this.httpService.post(`${gatewayUrl}/api/notif-internal/stock-alert`, { productId: id, stock: data.stock }));
            } catch (e: any) {
                console.error('Failed to send stock alert', e?.message);
            }
        }
        return p;
    }

    async addReview(productId: number, userId: number, data: any) {
        return this.prisma.review.create({
            data: { productId, userId, rating: data.rating, comment: data.comment }
        });
    }

    async getReviews(productId: number) {
        return this.prisma.review.findMany({ where: { productId } });
    }

    async delete(id: number) {
        return this.prisma.product.delete({ where: { id } });
    }
}
