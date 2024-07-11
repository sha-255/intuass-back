import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserToAdd } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addUser() {
        return await this.databaseService.user.create({
            data: {}
        });
    }

    async getUsers(): Promise<UserToAdd[]> {
        return (await this.databaseService.user.findMany({
            include: {
                wallet: true
            }
        })) as UserToAdd[];
    }

    async deleteUser(id: number) {
        return await this.databaseService.user.delete({
            where: {
                id,
            }
        })
    }
}
