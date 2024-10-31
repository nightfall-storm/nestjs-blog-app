import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: authDto.email },
      });

      if (!user) throw new ForbiddenException('Incorrect Credentials');

      const isPasswordValid = argon.verify(user.password, authDto.password);
      if (!isPasswordValid)
        throw new ForbiddenException('Incorrect Credentials');

      return this.assignToken({
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.log('something went wrong at login: ' + err);
    }
  }

  async signup(data: SignupAuthDto) {
    try {
      const hashedPw = await argon.hash(data.password);

      const user = await this.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashedPw,
        },
      });
      if (!user) throw new ForbiddenException("couldn't createuser");

      delete user.password;

      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async assignToken(payload: JwtPayload): Promise<{ token_access: string }> {
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '1h',
    });
    return { token_access: token };
  }
}
