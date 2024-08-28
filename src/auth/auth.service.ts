import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schemas';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { TokenPayload } from './token-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expiredAccessToken = new Date();
    expiredAccessToken.setMilliseconds(
      expiredAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const accesToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });

    response.cookie('Authentication', accesToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiredAccessToken,
    });

    return accesToken;
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.UserService.findOne({ email });
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
