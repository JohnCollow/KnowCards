import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Card from "App/Models/Card";

export default class CardsController {
  public async index() {
    const cards = await Card.all();

    return { data: cards };
  }

  public async show({ params }: HttpContextContract) {
    const card = await Card.findOrFail(params.id);

    return { data: card };
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body();
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
