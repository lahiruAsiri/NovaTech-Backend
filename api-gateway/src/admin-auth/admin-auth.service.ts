import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminAuthService {
  private readonly baseUrl = `${process.env.ADMIN_SERVICE_URL || 'http://localhost:3001'}/auth`;

  constructor(private readonly httpService: HttpService) {}

  async register(data: any) {
    const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/register`, data));
    return response.data;
  }

  async login(data: any) {
    const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/login`, data));
    return response.data;
  }
}
