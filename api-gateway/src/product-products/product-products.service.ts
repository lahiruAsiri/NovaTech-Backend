import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductProductsService {
  private readonly baseUrl = `${process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002'}/products`;

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user?: any) {
    if (!user) return {};
    return {
      'x-user-id': user.userId?.toString(),
      'x-user-role': user.role,
    };
  }

  async findAll() {
    const response = await lastValueFrom(this.httpService.get(this.baseUrl));
    return response.data;
  }

  async findOne(id: number) {
    const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/${id}`));
    return response.data;
  }

  async addReview(user: any, id: number, data: any) {
    const response = await lastValueFrom(
      this.httpService.post(`${this.baseUrl}/${id}/reviews`, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async create(user: any, data: any) {
    const response = await lastValueFrom(
      this.httpService.post(this.baseUrl, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async update(user: any, id: number, data: any) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/${id}`, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async remove(user: any, id: number) {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }
}
