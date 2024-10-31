import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }

  @Post('signup')
  async signup(@Body() signupAuth: SignupAuthDto) {
    return await this.authService.signup(signupAuth);
  }
}
