import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserToAdd } from 'src/dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  //@UseGuards(AuthGuard)
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

  @Get('main')
  @UseGuards(AuthGuard)
  async getMain(@Body('id', ParseIntPipe) id: number) {
    return await this.usersService.getMain(id);
  }
}
