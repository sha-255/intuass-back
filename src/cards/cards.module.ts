import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [CardsService],
  controllers: [CardsController],
  imports: [CardsModule, DatabaseModule],
  exports: [CardsService]
})
export class CardsModule {}
