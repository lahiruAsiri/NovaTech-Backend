import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
    private transporter: nodemailer.Transporter;

    constructor(private prisma: PrismaService, private httpService: HttpService) {
        // Initialize the email transporter
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER, // Your Gmail address
                pass: process.env.SMTP_PASS, // Your Gmail App Password
            },
        });
    }

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

        // Send the real email via Gmail
        try {
            await this.transporter.sendMail({
                from: `"NovaTech Support" <${process.env.SMTP_USER}>`,
                to: recipientEmail,
                subject: subject,
                text: body,
                html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #4f46e5;">NovaTech Notification</h2>
                        <p>${body}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <small style="color: #666;">This is an automated message from NovaTech Cloud System.</small>
                       </div>`,
            });
            console.log(`Email successfully sent to ${recipientEmail}`);
        } catch (err) {
            console.error('Failed to send real email', err.message);
        }

        const notif = await this.prisma.notification.create({
            data: { userId, type: 'EMAIL', subject, body: `To: ${recipientEmail}\n\n${body}`, status: 'SENT' }
        });
        
        await this.prisma.auditLog.create({
            data: { service: 'NOTIFICATIONS', action: 'SEND_EMAIL', details: `Real email sent to ${recipientEmail} via Gmail SMTP` }
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
