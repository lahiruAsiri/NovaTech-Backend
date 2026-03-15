import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotifAdminService {
  private readonly baseUrl = `${process.env.NOTIF_SERVICE_URL || 'http://localhost:3004'}/admin`;

  constructor(private readonly httpService: HttpService) {}

  async getAuditLogs(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/audit-logs`, {
        headers: {
          'x-user-id': user.userId.toString(),
          'x-user-role': user.role,
        }
      })
    );
    return response.data;
  }
}
