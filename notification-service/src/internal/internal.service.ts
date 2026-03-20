import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InternalService {
    constructor(private prisma: PrismaService, private httpService: HttpService) { }

    async logEvent(service: string, action: string, details: string) {
        return this.prisma.auditLog.create({
            data: { service, action, details }
        });
    }

    async handleStockAlert(productId: number, stock: number) {
        let productName = `Product ${productId}`;
        try {
            const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
            const response = await lastValueFrom(this.httpService.get(`${gatewayUrl}/api/product-products/${productId}`));
            productName = response.data.name;
        } catch (e) {
            console.error('Failed to fetch product name for alert', e?.message);
        }

        await this.prisma.auditLog.create({
            data: { service: 'INVENTORY_ALERT', action: 'LOW_STOCK', details: `Alert: "${productName}" (ID: ${productId}) has only ${stock} units left.` }
        });
        return { status: 'Alert Logged with Enrichment' };
    }
}
