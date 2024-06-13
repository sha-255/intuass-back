import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  imports: [DatabaseModule],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
