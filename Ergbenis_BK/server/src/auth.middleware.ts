import DbRepository, { IUser } from './db.repository';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// express converts headers to lowercase
const AUTH = 'x-auth-token';

// The middleware will set req.user if a valid token was found
// it won't block anything, this is up to the guards
@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly dbRepository: DbRepository) { }

    public async getSession(token: string): Promise<{ token: string, user: IUser }> {
        const session = await this.dbRepository.findSessionByToken(token);

        if (session === undefined) {
            throw new UnauthorizedException();
        }

        const user = await this.dbRepository.findUserById(session.userId);

        return {
            token,
            user,
        };
    }

    public async use(req: Request, res: Response, next: NextFunction) {

        const authToken: string = (req.headers[AUTH] as string);
        if (authToken) {

            const session = await this.getSession(authToken);
            if (session !== undefined) {

                // set the user object on the request object
                (req as any).user = session.user;
                (req as any).token = session.token;
            }
        }

        // call next function
        next();
    }
}
