import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Param,
<<<<<<< HEAD
=======
  Body,
>>>>>>> 48dff03e51a9707e4536e3ecf462990cab6d1753
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserToAdd } from 'src/dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
<<<<<<< HEAD
  @UseGuards(AuthGuard)
=======
  //@UseGuards(AuthGuard)
>>>>>>> 48dff03e51a9707e4536e3ecf462990cab6d1753
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

<<<<<<< HEAD
  @Get('main/:id')
  @UseGuards(AuthGuard)
  async getMain(@Param('id', ParseIntPipe) id: number) {
=======
  @Get('main')
  @UseGuards(AuthGuard)
  async getMain(@Body('id', ParseIntPipe) id: number) {
>>>>>>> 48dff03e51a9707e4536e3ecf462990cab6d1753
    return await this.usersService.getMain(id);
  }
}
