import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductCategoriesService {
  private readonly baseUrl = `${process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002'}/categories`;

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    return {
      'x-user-id': user.userId.toString(),
      'x-user-role': user.role,
    };
  }

  async findAll() {
    const response = await lastValueFrom(this.httpService.get(this.baseUrl));
    return response.data;
  }

  async create(data: any, user: any) {
    const response = await lastValueFrom(
      this.httpService.post(this.baseUrl, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async findOne(id: number) {
    const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/${id}`));
    return response.data;
  }

  async update(id: number, data: any, user: any) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/${id}`, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async remove(id: number, user: any) {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }
}
