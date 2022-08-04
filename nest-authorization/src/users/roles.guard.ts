import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflactor.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user: User = {
      name: 'Abc',
      roles: [Role.ADMIN],
    };

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
