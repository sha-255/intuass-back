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

<<<<<<< HEAD
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
=======
    async deleteUser(id: number) {
        return await this.databaseService.user.delete({
            where: {
                id,
            }
        })
    }

    async getMain(id: number) {
        return await this.databaseService.user.findFirst({
            where: {id},
            include: {
                wallet: true,
                cards: true
            }
            
        })
    }
>>>>>>> 48dff03e51a9707e4536e3ecf462990cab6d1753
}
