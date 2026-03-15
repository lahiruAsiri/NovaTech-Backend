import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderCartService {
  private readonly baseUrl = `${process.env.ORDER_SERVICE_URL || 'http://localhost:3003'}/cart`;

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    return {
      'x-user-id': user.userId.toString(),
      'x-user-role': user.role,
    };
  }

  async getCart(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(this.baseUrl, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async addToCart(user: any, data: any) {
    const response = await lastValueFrom(
      this.httpService.post(`${this.baseUrl}/add`, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async updateQuantity(user: any, id: number, quantity: number) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/${id}/quantity`, { quantity }, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async removeFromCart(user: any, id: number) {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }
}
