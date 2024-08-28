import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
// import * as jwt from 'express-jwt';
import { ConfigService } from '@nestjs/config';

var { expressjwt: jwt } = require('express-jwt');

@Injectable()
export class AuthGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH1_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = configService.get('AUTH0_AUDIENCE');
    this.AUTH1_DOMAIN = configService.get('AUTH0_DOMAIN');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH1_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH1_DOMAIN,
        algorithms: ['RS256'],
      }),
    );
    console.log(req, res, this.AUTH0_AUDIENCE, this.AUTH1_DOMAIN);
    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
