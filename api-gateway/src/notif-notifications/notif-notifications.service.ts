import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotifNotificationsService {
  private readonly baseUrl = `${process.env.NOTIF_SERVICE_URL || 'http://localhost:3004'}/notifications`;

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    if (!user) return {}; // Return empty if no user (handled by calling service or guard)
    return {
      'x-user-id': (user.userId || user.sub)?.toString(),
      'x-user-role': user.role,
    };
  }

  async getInbox(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/my-inbox`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async sendEmail(user: any, data: any) {
    // If internal call, the headers might already be there or provided in data
    const headers = this.getHeaders(user);
    const response = await lastValueFrom(
      this.httpService.post(`${this.baseUrl}/send-email`, data, { headers })
    );
    return response.data;
  }

  async markRead(user: any, id: number) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/${id}/read`, {}, { headers: this.getHeaders(user) })
    );
    return response.data;
  }
}
