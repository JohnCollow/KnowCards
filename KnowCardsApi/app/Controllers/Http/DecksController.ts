import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Deck from "App/Models/Deck";

export default class DecksController {
  public async index() {
    const decks = await Deck.query().preload('cards');

    return { data: decks };
  }

  public async show({ params }: HttpContextContract) {
    const deck = await Deck.findOrFail(params.id);

    await deck.load('cards')

    return { data: deck };
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body();

    const deck = await Deck.create(body);

    return { message: "Deck criado com sucesso!", data: deck };
  }

  public async destroy({ params }: HttpContextContract) {
    const deck = await Deck.findOrFail(params.id);
    deck.delete();
    return { message: "Deck deletado com sucesso!" };
  }

  public async update({ request, params }: HttpContextContract) {
    const deck = await Deck.findOrFail(params.id);
    const body = request.body();

    deck.name = body.name;

    deck.save();
  }
}
