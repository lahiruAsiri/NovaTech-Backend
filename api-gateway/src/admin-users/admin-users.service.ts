import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminUsersService {
  private readonly baseUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3001';

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    if (!user) return {};
    const userId = (user.userId || user.sub);
    const role = user.role;
    
    console.log(`DEBUG: Gateway Service - Preparing headers for userId: ${userId}, role: ${role}`);
    
    // Ensure we don't send "undefined" as a string
    if (userId === undefined || userId === null) {
      console.warn('DEBUG: Gateway Service - userId is missing!');
      return { 'x-user-role': role };
    }

    return {
      'x-user-id': userId.toString(),
      'x-user-role': role,
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
