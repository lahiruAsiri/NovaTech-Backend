import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService, private httpService: HttpService) { }

    async checkout(userId: number) {
        // 1. Get Cart
        const cartItems = await this.prisma.cart.findMany({ where: { userId } });
        if (cartItems.length === 0) throw new BadRequestException('Cart is empty');

        // 2. Validate User Profile from Admin Service
        try {
            const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
            const addressReq = await lastValueFrom(this.httpService.get(`${gatewayUrl}/api/admin-internal/profile/${userId}`));
            if (!addressReq.data || !addressReq.data.profile) throw new Error('No profile setup');
        } catch (e) {
            throw new BadRequestException('Please complete profile in Admin Service before checkout');
        }

        // 3. Verify Stock and Price from Product Service
        let total = 0;
        const itemsData: any[] = [];
        for (const item of cartItems) {
            try {
                const prodData = await lastValueFrom(this.httpService.get(`${process.env.GATEWAY_URL || 'http://localhost:3000'}/api/product-products/${item.productId}`, {
                    headers: { 'x-user-id': userId.toString(), 'x-user-role': 'USER' }
                }));
                if (prodData.data.stock < item.quantity) {
                    throw new BadRequestException(`Insufficient stock for product ${prodData.data.name}`);
                }
                total += prodData.data.price * item.quantity;
                itemsData.push({ productId: item.productId, quantity: item.quantity, price: prodData.data.price });
            } catch (e: any) {
                throw new BadRequestException(e.response?.data?.message || 'Error verifying products');
            }
        }

        // 4. Create Order and Transaction locally
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    total,
                    status: 'CONFIRMED',
                    items: {
                        create: itemsData.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                }
            });
            await tx.transaction.create({
                data: {
                    orderId: newOrder.id,
                    amount: total,
                    status: 'SUCCESS'
                }
            });
            await tx.cart.deleteMany({ where: { userId } });
            return newOrder;
        });

        // 5. Reduce stock via Gateway Internal Route
        console.log(`DEBUG: Reducing stock for ${cartItems.length} items...`);
        for (const item of cartItems) {
            await lastValueFrom(this.httpService.patch(`${process.env.GATEWAY_URL || 'http://localhost:3000'}/api/product-internal/stock/reduce`, {
                items: [{ productId: item.productId, quantity: item.quantity }]
            })).catch(e => { console.error('DEBUG: Failed to reduce stock', e.message); });
        }

        // 6. Notify user
        console.log(`DEBUG: Sending order confirmation email for order #${order.id}...`);
        let notificationStatus: { sent: boolean, error: string } = { sent: false, error: '' };
        try {
            await lastValueFrom(this.httpService.post(`${process.env.GATEWAY_URL || 'http://localhost:3000'}/api/notif-internal/send-email`, {
                userId,
                subject: `Order #${order.id} Confirmed`,
                body: `Thank you for your order totaling $${total}`
            }));
            console.log('DEBUG: Email notification trigger sent successfully.');
            notificationStatus.sent = true;
        } catch (e) {
            console.error('DEBUG: Failed to trigger notification', e.message);
            notificationStatus.error = e.message;
            if (e.response) {
                notificationStatus.error += ` - Status: ${e.response.status} - Data: ${JSON.stringify(e.response.data)}`;
            }
        }

        console.log(`DEBUG: Checkout complete for Order #${order.id}`);
        return {
            ...order,
            notification: notificationStatus
        };
    }

    async getHistory(userId: number) {
        return this.prisma.order.findMany({ where: { userId }, include: { items: true, transaction: true } });
    }

    async getOne(id: number, userId: number, role: string) {
        const order = await this.prisma.order.findUnique({ where: { id }, include: { items: true } });
        if (!order) throw new NotFoundException('Order not found');
        if (order.userId !== userId && role !== 'ADMIN') throw new BadRequestException('Unauthorized');
        return order;
    }

    async cancelOrder(id: number, userId: number) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order || order.userId !== userId) throw new NotFoundException('Order not found');
        return this.prisma.order.update({ where: { id }, data: { status: 'CANCELLED' } });
    }

    async updateStatus(id: number, status: string) {
        return this.prisma.order.update({ where: { id }, data: { status } });
    }
}
