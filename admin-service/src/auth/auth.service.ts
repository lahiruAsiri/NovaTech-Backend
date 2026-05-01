import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwtService: JwtService,
        private httpService: HttpService
    ) { }

    async register(data: any) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Ensure roles exist
        let roleId;
        let role = await this.prisma.role.findUnique({ where: { name: data.role || 'USER' } });
        if (!role) {
            role = await this.prisma.role.create({ data: { name: data.role || 'USER' } });
        }
        roleId = role.id;

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                roleId: roleId,
                profile: {
                    create: {
                        name: data.name || data.email.split('@')[0],
                    }
                }
            },
            include: { role: true, profile: true },
        });

        // Inter-service call: Send Welcome Email via Notification Service
        try {
            const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
            await lastValueFrom(this.httpService.post(`${gatewayUrl}/api/notif-notifications/send-email`, {
                userId: user.id,
                subject: 'Welcome to NovaTech!',
                body: `Hello ${user.profile?.name || 'User'}, your account has been successfully created.`
            }, {
                headers: { 'x-user-id': user.id.toString(), 'x-user-role': user.role.name }
            }));
        } catch (e) {
            console.error('Failed to trigger welcome email', e?.message);
        }

        return { id: user.id, email: user.email, role: user.role.name };
    }

    async login(data: any) {
        console.log(`DEBUG: Attempting login for email: ${data.email}`);
        try {
            console.log('DEBUG: Querying database...');
            const user = await this.prisma.user.findUnique({
                where: { email: data.email },
                include: { role: true },
            });
            console.log('DEBUG: Database query complete. User found:', user ? 'YES' : 'NO');

            if (!user || !(await bcrypt.compare(data.password, user.password))) {
                console.log('DEBUG: Invalid credentials');
                throw new UnauthorizedException('Invalid credentials');
            }

            console.log('DEBUG: Login successful, signing token...');
            const payload = { sub: user.id, email: user.email, role: user.role.name };
            return {
                access_token: this.jwtService.sign(payload),
                user: { id: user.id, email: user.email, role: user.role.name }
            };
        } catch (error) {
            console.error('DEBUG: Login Error:', error.message);
            throw error;
        }
    }
}
