import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserToAdd } from 'src/dto/user.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registrate')
    async registrate(@Body() userData: { address: string }): Promise<{accessToken: string}> {
        return await this.authService.registrate(userData.address);
    }

    @Post('signIn')
    async signIn(@Body() userData: { adress: number }): Promise<{accessToken: string}> {
        return await this.authService.signIn(userData.adress)
    }

    @UseGuards(AuthGuard)
    @Get('wallet')
    async getWallet(@Request() req) {
        return req.user.username
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async getUser(@Request() req) {
        return await this.authService.getUser(req.user.username)
    }
}
