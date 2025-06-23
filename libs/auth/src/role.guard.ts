import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('🛡️ RolesGuard - Required roles:', requiredRoles);
    console.log('👤 RolesGuard - Authenticated user:', user);

    if (!requiredRoles) {
      return true;
    }

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: No user or role found');
    }

    const hasAccess = requiredRoles.some(
      (role) => role.toLowerCase() === user.role.toLowerCase(),
    );

    if (!hasAccess) {
      throw new ForbiddenException('Access denied: Role not allowed');
    }

    return true;
  }
}
