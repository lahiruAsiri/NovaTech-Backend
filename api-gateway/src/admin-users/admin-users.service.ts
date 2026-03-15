import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminUsersService {
  private readonly baseUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3001';

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    return {
      'x-user-id': user.userId.toString(),
      'x-user-role': user.role,
    };
  }

  async getProfile(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users/profile`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async updateProfile(user: any, data: any) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/users/profile/update`, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async getAddresses(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users/address`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async addAddress(user: any, data: any) {
    const response = await lastValueFrom(
      this.httpService.post(`${this.baseUrl}/users/address`, data, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async getAllUsers(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/admin/users`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async getRecommendations(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users/profile/recommendations`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }
}
