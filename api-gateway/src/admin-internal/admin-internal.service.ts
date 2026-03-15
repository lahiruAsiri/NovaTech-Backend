import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminInternalService {
  private readonly baseUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3001';

  constructor(private readonly httpService: HttpService) {}

  async getProfile(userId: number) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users/profile`, {
        headers: {
          'x-user-id': userId.toString(),
          'x-user-role': 'USER', // Trusting the internal call
        },
      })
    );
    return response.data;
  }
}
