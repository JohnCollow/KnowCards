import { Component } from '@angular/core';
import { deck } from 'src/app/interfaces/deck';
import { card } from 'src/app/interfaces/card';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
})
export class DecksComponent {
  constructor(private deckService: DeckService) {}

  selectedCard!:card;
  cardQuestion:string = "Qual a parte da célula responsável pela produção de energia?";
  cardResponse:string = "Mitocôndria";

  deckTest:deck = {name:"teste",cards:[{question:"teste Questão",response:"teste Resposta",difficulty:1}]}

  decks: deck[] = [
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckTest
  ];

  cards:card[] = []

  deckSelection(deckPosition:number){
    this.cards = this.decks[deckPosition].cards
  }

  cardSelection(cardPosition:number){
    this.selectedCard = this.cards[cardPosition]
    this.cardQuestion = this.selectedCard.question;
    this.cardResponse = this.selectedCard.response;
  }



}
