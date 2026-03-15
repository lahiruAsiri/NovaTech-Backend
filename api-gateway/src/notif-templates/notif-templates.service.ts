import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotifTemplatesService {
  private readonly baseUrl = `${process.env.NOTIF_SERVICE_URL || 'http://localhost:3004'}/templates`;

  constructor(private readonly httpService: HttpService) {}

  async getTemplate(type: string) {
    const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/${type}`));
    return response.data;
  }

  async create(user: any, data: any) {
    const response = await lastValueFrom(
      this.httpService.post(this.baseUrl, data, {
        headers: {
          'x-user-id': user.userId.toString(),
          'x-user-role': user.role,
        }
      })
    );
    return response.data;
  }
}
