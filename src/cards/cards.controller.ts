import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from 'src/dto/card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('userId/:id')
  async getUserCards(@Param('id') userId: number) {
    return await this.cardsService.getUserCards(userId);
  }

  @Post()
  async addCard(@Body() card: Card) {
    return await this.cardsService.addCard(card);
  }

  @Delete('/:id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.cardsService.deleteCard(id);
  }
}
