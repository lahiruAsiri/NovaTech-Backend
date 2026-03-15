import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderOrdersService {
  private readonly baseUrl = `${process.env.ORDER_SERVICE_URL || 'http://localhost:3003'}/orders`;

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    return {
      'x-user-id': user.userId.toString(),
      'x-user-role': user.role,
    };
  }

  async checkout(user: any) {
    const response = await lastValueFrom(
      this.httpService.post(`${this.baseUrl}/checkout`, {}, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async getHistory(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/history`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async findOne(user: any, id: number) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async cancelOrder(user: any, id: number) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/${id}/cancel`, {}, { headers: this.getHeaders(user) })
    );
    return response.data;
  }
}
