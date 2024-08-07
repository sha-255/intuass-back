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
    async signIn(@Body() userData: { id: number }): Promise<{accessToken: string}> {
        return await this.authService.signIn(userData.id)
    }

    @UseGuards(AuthGuard)
    @Get('wallet')
    async getWallet(@Request() req) {
        return req.user.username
    }
}
