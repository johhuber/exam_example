
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: any = context.switchToHttp().getRequest();
        const currentUser = request.user;

        if (currentUser === undefined) {
            throw new UnauthorizedException();
        }

        return true;
    }
}