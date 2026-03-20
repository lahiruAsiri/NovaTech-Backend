import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles || roles.length === 0) {
            return true; // No roles required
        }

        const request = context.switchToHttp().getRequest();
        const userRole = request.headers['x-user-role'];

        if (!userRole) {
            throw new UnauthorizedException('Missing role header. Request must pass through Gateway.');
        }

        if (!roles.includes(userRole)) {
            throw new ForbiddenException(`Access forbidden for role: ${userRole}`);
        }

        return true;
    }
}
