import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderInternalService {
  private readonly baseUrl = `${process.env.ORDER_SERVICE_URL || 'http://localhost:3003'}/internal`;

  constructor(private readonly httpService: HttpService) {}

  async logOrderEvent(data: any) {
    const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/log`, data));
    return response.data;
  }

  async getProductStats(productId: number) {
    const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/stats/${productId}`));
    return response.data;
  }
}
