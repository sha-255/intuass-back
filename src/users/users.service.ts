import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(login: string): Promise<User> {
    console.log('User fined', login);
    return (await this.databaseService.user.findFirst({
      where: {
        login: login,
      },
    })) as User;
  }

  async add(user: User) {
    console.log('Added user', user);
    await this.databaseService.user.create({
      data: {
        login: user.login,
        password: user.password,
      },
    });
  }

  async update(user: User) {
    console.log('User updated', user);
    await this.databaseService.user.update({
      where: { id: user.id },
      data: {
        login: user.login,
        password: user.password,
      },
    });
  }
}
