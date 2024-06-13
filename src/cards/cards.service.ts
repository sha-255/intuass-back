import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Card } from 'src/dto/card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCards(): Promise<Card[]> {
    return (await this.databaseService.card.findMany()) as Card[];
  }

  async addCard(card: Card) {
    return await this.databaseService.card.create({
      data: {
        poolId: card.poolId,
        reloadTime: card.reloadTime,
        imageUri: card.imageUri,
      },
    });
  }

  async delete(id: number) {
    return await this.databaseService.card.delete({
      where: {
        id,
      },
    });
  }
}
