import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserToAdd } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addUser() {
    return await this.databaseService.user.create({
      data: {},
    });
  }

  async getUsers(): Promise<UserToAdd[]> {
    return (await this.databaseService.user.findMany({
      include: {
        wallet: true,
      },
    })) as UserToAdd[];
  }

  async deleteUser(id: number) {
    return await this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }

  async getMain(id: number) {
    return await this.databaseService.user.findFirst({
      where: { id },
      include: {
        wallet: {
          include: {
            stake: true,
          },
        },
        cards: true,
      },
    });
  }

  async claimReward(id: number) {
    const wallet = await this.databaseService.wallet.findFirst({
      where: {id}
    })

    return await this.databaseService.wallet.update({
      where: { id },
      data: { inas: wallet.inas + wallet.reward,
        reward: 0
      }
    })
  }
}
