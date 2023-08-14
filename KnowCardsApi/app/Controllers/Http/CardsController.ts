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
    body.deckId = deckId;
    const card = await Card.create(body);
    response.status(201);

    return { Message: "Card Registrado com sucesso", data: card };
  }

  public async destroy({ params }: HttpContextContract) {
    const card = await Card.findOrFail(params.id);
    card.delete();
    return { message: "Carta deletada com sucesso!" };
  }

  public async update({ request, params }: HttpContextContract) {
    const card = await Card.findOrFail(params.id);

    const body = request.body();

    card.question = body.question;
    card.response = body.response;
    card.difficulty = body.difficulty;

    await card.save();

    return { message: "Carta atualizada com sucesso!", data: card };
  }
}
