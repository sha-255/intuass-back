import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [UsersModule, DatabaseModule],
  exports: [UsersService]
})
export class UsersModule {}
