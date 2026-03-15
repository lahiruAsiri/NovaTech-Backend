import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role;
    
    if (!userRole) {
      throw new UnauthorizedException('Authentication required');
    }
    
    if (!roles.includes(userRole)) {
      throw new ForbiddenException(`Role ${userRole} is not authorized`);
    }
    
    return true;
  }
}
