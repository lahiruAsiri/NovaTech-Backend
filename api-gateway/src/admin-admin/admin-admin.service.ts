import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminAdminService {
  private readonly baseUrl = `${process.env.ADMIN_SERVICE_URL || 'http://localhost:3001'}/admin`;

  constructor(private readonly httpService: HttpService) {}

  private getHeaders(user: any) {
    return {
      'x-user-id': user.userId.toString(),
      'x-user-role': user.role,
    };
  }

  async getAllUsers(user: any) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async deleteUser(user: any, id: number) {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders(user) })
    );
    return response.data;
  }

  async updateRole(user: any, id: number, role: string) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.baseUrl}/users/${id}/role`, { role }, { headers: this.getHeaders(user) })
    );
    return response.data;
  }
}
