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

  editing: { question: boolean; response: boolean } = {
    question: false,
    response: false,
  };

  selectedCard!: card;
  deckTest: deck = {
    name: 'teste',
    cards: [
      { question: 'teste Questão', response: 'teste Resposta', difficulty: 1 },
      {
        question:
          'Qual a parte da célula responsável pela produção de energia?',
        response: 'Mitocôndria',
        difficulty: 1,
      },
    ],
  };

  cardQuestion: string =
    'Selecione um deck para poder ver seus cards';
  cardResponse: string = '';

  questionTextBox_text: string = this.cardQuestion;
  responseTextBox_text: string = this.cardResponse;

  decks: deck[] = [
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckService.getATestDeck(),
    this.deckTest,
  ];

  cards: card[] = [];

  deckSelection(deckPosition: number) {
    this.cards = this.decks[deckPosition].cards;
  }

  cardSelection(cardPosition: number) {
    this.editing.question = false;
    this.editing.response = false;
    this.selectedCard = this.cards[cardPosition];
    this.restartText();
  }

  edit(cardSide: string) {
    if (this.selectedCard) {
      if (cardSide === 'question' && this.editing.question == false) {
        this.editing.question = true;
      } else if (cardSide === 'response' && this.editing.response == false) {
        this.editing.response = true;
      }
    }
  }

  saveCard(event: Event, cardSide: string) {
    event.stopPropagation();
    if (this.questionTextBox_text.length >= 280 || this.responseTextBox_text.length >= 280
    ) {
      alert('O texto é longo demais!');
      return;
    }
    if (cardSide === 'question') {
      this.editing.question = false;
      this.selectedCard.question = this.questionTextBox_text;
    } else if (cardSide === 'response') {
      this.editing.response = false;
      this.selectedCard.response = this.responseTextBox_text;
    }

    this.restartText();
  }

  restartText() {
    this.cardQuestion = this.selectedCard.question;
    this.cardResponse = this.selectedCard.response;

    this.questionTextBox_text = this.selectedCard.question;
    this.responseTextBox_text = this.selectedCard.response;
  }
}
