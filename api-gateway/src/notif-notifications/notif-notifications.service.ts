import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotifNotificationsService {
  private readonly baseUrl = `${process.env.NOTIF_SERVICE_URL || 'http://localhost:3004'}/notifications`;

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    return {
      'x-user-id': user.userId.toString(),
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
    const response = await lastValueFrom(
      this.httpService.post(`${this.baseUrl}/send-email`, data, { headers: this.getHeaders(user) })
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
