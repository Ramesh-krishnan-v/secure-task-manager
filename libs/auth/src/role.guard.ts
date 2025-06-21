import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    
    // TEMP: inject a fake role for testing until real auth is added
    request.user = { role: 'Viewer' }; // change to 'Admin' or 'Viewer' to simulate other roles

    const userRole = request.user?.role;

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
