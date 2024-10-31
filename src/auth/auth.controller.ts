import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() authDto: AuthDto){
        return await this.authService.login(authDto);
    }

    @Post('signup')
    async signup(@Body() signupAuth: SignupAuthDto){
        return await this.authService.signup(signupAuth);
    }
}
