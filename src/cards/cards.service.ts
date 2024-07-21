import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Card } from 'src/dto/card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserCards(userId: number): Promise<Card[]> {
    const user = await this.databaseService.user.findFirst({
      where: {
        id: Number.parseInt(userId.toString()),
      },
    });
    if (user) {
      return await this.databaseService.card.findMany({
        where: {
          userId: Number.parseInt(userId.toString()),
        },
      });
    }
    throw new NotFoundException();
  }

  async addCard(card: Card) {
    return await this.databaseService.card.create({
      data: {
        userId: card.userId,
        pool: card.pool,
        number: card.number,
        reloadTime: card.reloadTime,
        reloadStartTime: card.reloadStartTime,
        cost: card.cost,
        imageUri: card.imageUri,
      },
    });
  }

  async deleteCard(id: number) {
    return await this.databaseService.card.delete({
      where: {
        id: id,
      },
    });
  }
}
