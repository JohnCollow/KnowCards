import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Card from "App/Models/Card";
import Deck from "App/Models/Deck";

export default class CardsController {
  public async index() {
    const cards = await Card.all();

    return { data: cards };
  }

  public async show({ params }: HttpContextContract) {
    const card = await Card.findOrFail(params.id);

    return { data: card };
  }

  public async store({ request, params, response }: HttpContextContract) {
    const deckId = params.id;
    await Deck.findOrFail(deckId);
    const body = request.body();

    if (Array.isArray(body)) {
      const cardsToCreate = body.map((cardData: any) => ({
        question: cardData.question,
        response: cardData.response,
        difficulty: cardData.difficulty,
        deckId: deckId,
      }));

      const createdCards = await Card.createMany(cardsToCreate);
      response.status(201);
      return { message: "Cards Criados com sucesso!", data: createdCards };
    } else {
      if (body.question && body.response && body.difficulty) {
        body.deckId = deckId;
        const card = await Card.create(body);
        response.status(201);
        return { Message: "Card Registrado com sucesso", data: card };
      }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const card = await Card.findOrFail(params.id);
    card.delete();
    return { message: "Carta deletada com sucesso!" };
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();
    let cards:Card[] = [];
      if (Array.isArray(body)) {
        await Promise.all(body.map(async (cardData) => {
          try {
            const card = await Card.findOrFail(cardData.id);
            card.difficulty = cardData.difficulty;
            await card.save();
            cards.push(card);
          } catch (error) {
            console.error(`Erro ao atualizar o card ${cardData.id}: ${error.message}`);
          }
        }));
        return { message: "Dificuldade das cartas atualizada com sucesso!", data: cards };
    } else {
      const card = await Card.findOrFail(params.id);

      card.question = body.question;
      card.response = body.response;
      card.difficulty = body.difficulty;

      await card.save();

      return { message: "Carta atualizada com sucesso!", data: card };
    }
  }
}
