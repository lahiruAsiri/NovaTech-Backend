import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getAuditLogs() {
        return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getFailedNotifications() {
        return this.prisma.notification.findMany({ where: { status: 'FAILED' } });
    }
}
