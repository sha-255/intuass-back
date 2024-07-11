import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly UsersService: UsersService, private readonly DatabaseService: DatabaseService, private readonly jwtService: JwtService) {}

    async registrate(address: string): Promise<{accessToken}> {
        const user = await this.UsersService.addUser()
        await this.DatabaseService.wallet.create({
            data: { userId: user.id, address, inas:0, reward:0 } 
        })
        return {
            accessToken: await this.jwtService.signAsync({
                sub: user.id,
                username: address
            })
        }
    }

    async signIn(id: number): Promise<{accessToken}> {
        const user = await this.DatabaseService.user.findFirst({
            where: {
                id: id,
             },
            include: {
                wallet: true
            }
        })
        return {
            accessToken: await this.jwtService.signAsync({
                sub: user.id,
                username: user.wallet.address,
            })
        }
    }
}
