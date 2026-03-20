import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService,
        private httpService: HttpService
    ) { }

    async getRecommendedProducts(userId: number) {
        // Inter-service call: Ask Product Service for all products
        // Then we could implement a basic personalized filter (here we simulate by taking top 4)
        try {
            const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
            const response = await lastValueFrom(this.httpService.get(`${gatewayUrl}/api/product-products`));
            const allProducts = response.data;
            
            // Basic recommendation logic: return 4 random products for now
            return allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        } catch (e) {
            console.error('Failed to fetch recommendations', e?.message);
            return [];
        }
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            include: { profile: true, role: true },
        });
    }

    async deleteUser(userId: number) {
        return this.prisma.user.delete({
            where: { id: userId },
        }).catch(() => {
            throw new NotFoundException('User not found');
        });
    }

    async updateRole(userId: number, roleName: string) {
        const role = await this.prisma.role.findUnique({ where: { name: roleName } });
        if (!role) throw new NotFoundException('Role not found');
        return this.prisma.user.update({
            where: { id: userId },
            data: { roleId: role.id }
        });
    }
}
