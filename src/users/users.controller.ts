import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserToAdd } from 'src/dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(): Promise<UserToAdd[]> {
    return await this.usersService.getUsers();
  }

  @Post()
  async addUsers() {
    return await this.usersService.addUser();
  }

  @Delete('/:id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }

  @Get('main/:id')
  @UseGuards(AuthGuard)
  async getMain(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getMain(id);
  }

  @Post('/:id/claimReward')
  @UseGuards(AuthGuard)
  async claimReward(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.claimReward(id);
  }
}
