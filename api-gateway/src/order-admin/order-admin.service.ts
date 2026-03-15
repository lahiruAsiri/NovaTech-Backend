import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderAdminService {
  private readonly baseUrl = `${process.env.ORDER_SERVICE_URL || 'http://localhost:3003'}/admin`;

  constructor(private readonly httpService: HttpService) {}

  async getSalesReport(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/sales-report`, {
        headers: {
          'x-user-id': user.userId.toString(),
          'x-user-role': user.role,
        }
      })
    );
    return response.data;
  }

  async getAllOrders(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/orders`, {
        headers: {
          'x-user-id': user.userId.toString(),
          'x-user-role': user.role,
        }
      })
    );
    return response.data;
  }

  async updateOrderStatus(user: any, id: number, status: string) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/orders/${id}/status`, { status }, {
        headers: {
          'x-user-id': user.userId.toString(),
          'x-user-role': user.role,
        }
      })
    );
    return response.data;
  }
}
