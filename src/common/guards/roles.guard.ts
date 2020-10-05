import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    Logger.log({ roles });
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    Logger.log({ user });
    Logger.log({ roles: user?.roles });
    return this.match(roles, user?.roles || ['not allowed']);
  }

  private match(roles: string[], userRoles: string[]): boolean {
    return !!roles.find(r => userRoles.includes(r));
  }
}