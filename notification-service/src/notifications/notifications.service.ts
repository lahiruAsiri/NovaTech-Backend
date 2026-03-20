import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService, private httpService: HttpService) { }

    async sendEmail(userId: number, subject: string, body: string) {
        let recipientEmail = 'unknown@novatech.com';
        try {
            const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
            const response = await lastValueFrom(this.httpService.get(`${gatewayUrl}/api/admin-users/profile`, {
                headers: { 'x-user-id': userId.toString(), 'x-user-role': 'ADMIN' }
            }));
            recipientEmail = response.data.email;
        } catch (e) {
            console.error('Failed to fetch recipient email', e?.message);
        }

        const notif = await this.prisma.notification.create({
            data: { userId, type: 'EMAIL', subject, body: `To: ${recipientEmail}\n\n${body}`, status: 'SENT' }
        });
        // Record in audit log
        await this.prisma.auditLog.create({
            data: { service: 'NOTIFICATIONS', action: 'SEND_EMAIL', details: `Enriched email sent to ${recipientEmail}` }
        });
        return notif;
    }

    async sendSms(userId: number, message: string) {
        const notif = await this.prisma.notification.create({
            data: { userId, type: 'SMS', subject: 'SMS Alert', body: message, status: 'SENT' }
        });
        return notif;
    }

    async getMyInbox(userId: number) {
        return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    }

    async markRead(id: number) {
        return this.prisma.notification.update({ where: { id }, data: { read: true } });
    }
}
