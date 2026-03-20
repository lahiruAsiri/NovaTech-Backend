import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private httpService: HttpService) { }

    async getProfile(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async getRecommendedProducts(userId: number) {
        try {
            const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
            const response = await lastValueFrom(this.httpService.get(`${gatewayUrl}/api/product-products`));
            const allProducts = response.data;
            return allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        } catch (e) {
            console.error('Failed to fetch recommendations', e?.message);
            return [];
        }
    }

    async updateProfile(userId: number, data: any) {
        return this.prisma.profile.upsert({
            where: { userId },
            update: { name: data.name, phone: data.phone },
            create: { userId, name: data.name, phone: data.phone },
        });
    }

    async addAddress(userId: number, data: any) {
        return this.prisma.address.create({
            data: {
                userId,
                street: data.street,
                city: data.city,
                zip: data.zip,
            },
        });
    }

    async getAddress(userId: number, addressId: number) {
        const address = await this.prisma.address.findFirst({
            where: { id: addressId, userId },
        });
        if (!address) throw new NotFoundException('Address not found');
        return address;
    }
}
