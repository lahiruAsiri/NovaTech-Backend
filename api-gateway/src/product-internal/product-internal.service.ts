import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductInternalService {
  private readonly baseUrl = `${process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002'}/internal`;

  constructor(private readonly httpService: HttpService) {}

  async checkStock(id: number) {
    const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/stock/check/${id}`));
    return response.data;
  }

  async reduceStock(items: any[]) {
    const response = await lastValueFrom(this.httpService.patch(`${this.baseUrl}/stock/reduce`, { items }));
    return response.data;
  }
}
