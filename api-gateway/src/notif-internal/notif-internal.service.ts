import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotifInternalService {
  private readonly baseUrl = `${process.env.NOTIF_SERVICE_URL || 'http://localhost:3004'}/notifications/internal`;

  constructor(private readonly httpService: HttpService) {}

  async logEvent(data: any) {
    const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/log-event`, data));
    return response.data;
  }

  async sendStockAlert(data: any) {
    const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/stock-alert`, data));
    return response.data;
  }

  async sendEmail(data: any) {
    // Forward to Notification Service internal route
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${process.env.NOTIF_SERVICE_URL || 'http://localhost:3004'}/notifications/send-email`, data, {
          headers: { 'x-user-role': 'ADMIN' } // Internal role bypass
        })
      );
      return response.data;
    } catch (e) {
      console.error('DEBUG: Gateway NotifInternalService error', e.message);
      if (e.response) {
        console.error('DEBUG: Response Data', JSON.stringify(e.response.data));
      }
      throw e;
    }
  }
}
