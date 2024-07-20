import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Card } from 'src/dto/card.dto';

@Injectable()
export class CardsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getUserCards(userNumber: number): Promise<Card[]> {
        return
        // return (await this.databaseService.user.findMany({ where: { id: userNumber }, include: {cards: true} })) as Card[];
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
            }
        })
    }

    async deleteCard(id: number) {
        return await this.databaseService.card.delete({
            where: {
              id: id,
            },
          });
    }
}
