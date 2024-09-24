import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsersService: UsersService,
    private readonly DatabaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(address: string): Promise<{ accessToken }> {
    let userData;
    const check = !!(await this.DatabaseService.wallet.findFirst({
      where: { address: address },
    }));
    console.log(check);
    if (check) {
      userData = await this.signIn(address);
    } else {
      userData = await this.registrate(address);
    }
    return {
      accessToken: await this.jwtService.signAsync({
        sub: userData.userId,
        username: userData.address,
      }),
    };
  }

  async signIn(address: string) {
    const user = await this.DatabaseService.wallet.findFirst({
      where: { address: address },
    });
    return user;
  }

  async registrate(address: string) {
    const newUser = await this.UsersService.addUser();
    await this.DatabaseService.wallet.create({
      data: { userId: newUser.id, address, inas: 0, reward: 0 },
    });
    const user = await this.DatabaseService.wallet.findFirst({
      where: { address: address },
    });
    return user;
  }

  async getWallet(id: number): Promise<{ walletId }> {
    const wallet = await this.DatabaseService.user.findFirst({
      where: { id: id },
      include: { wallet: true },
    });
    return {
      walletId: wallet.wallet.address,
    };
  }

  async getUser(address: string): Promise<{ user }> {
    const wallet = await this.DatabaseService.wallet.findFirst({
      where: { address: address },
    });

    const user = await this.DatabaseService.user.findFirst({
      where: { id: wallet.userId },
      include: {
        wallet: {
          include: {
            stake: true,
          },
        },
        cards: true,
      },
    });
    return {
      user: user,
    };
  }
}
