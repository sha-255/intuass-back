import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';


@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, CardsModule],
  controllers: [AppController],
  providers: [AppService, UsersService, DatabaseService],
})
export class AppModule {}
