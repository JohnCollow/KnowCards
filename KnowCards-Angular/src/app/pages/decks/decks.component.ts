import { Component, OnInit } from '@angular/core';
import { deck } from 'src/app/interfaces/deck';
import { card } from 'src/app/interfaces/card';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
})
export class DecksComponent implements OnInit {
  constructor(private deckService: DeckService) {}

  editing: { question: boolean; response: boolean; deck: boolean } = {
    question: false,
    response: false,
    deck: false,
  };

  deckToRename: number = -1;

  selectedCard!: card;
  selectedDeckId!: number;
  cardQuestion: string = 'Selecione um deck para poder ver seus cards';
  cardResponse: string = '';

  deckEditText: string = '';

  questionTextBox_text: string = this.cardQuestion;
  responseTextBox_text: string = this.cardResponse;

  decks: deck[] = [];
  cards: card[] = [];

  ngOnInit(): void {
    this.getAllDecks();
  }

  deckSelection(deckPosition: number) {
    this.selectedDeckId = Number(this.decks[deckPosition].id);
    this.deckToRename = -1;
    this.editing.deck = false;
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
    if (
      this.questionTextBox_text.length >= 280 ||
      this.responseTextBox_text.length >= 280
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
      this.deckService.UpdateACard(this.selectedCard);
    }
    this.deckService.UpdateACard(this.selectedCard).subscribe((response) => {
      console.log(`Mensagem: ${response.message}`);
      console.log(`Card: ${JSON.stringify(response.data)}`);
    });
    this.restartText();
  }

  getAllDecks() {
    this.deckService.getAllDecks().subscribe((deck) => {
      this.decks = deck.data;
    });
  }

  addDeck() {
    this.deckService.addDeck().subscribe((response) => {
      const deck: deck = {
        name: response.data.name,
        cards: [],
        id: response.data.id,
      };
      this.decks.push(deck);
    });
  }

  deleteDeck(index: number) {
    this.deckService.deleteDeck(this.decks[index].id!).subscribe();
    if (this.decks[index].id === this.selectedDeckId) {
      this.cardQuestion = 'Selecione um deck para poder ver seus cards';
      this.cardResponse = '';
      this.cards = [];
      this.selectedDeckId = -1;
    }
    this.decks.splice(index, 1);
  }

  editDeck(index: number) {
    this.deckToRename = index;
    this.editing.deck = true;
    this.deckEditText = this.decks[index].name;
  }

  cancelNameEdit() {
    this.deckToRename = -1;
  }

  renameDeck(index:number) {
    this.deckService.renameDeck(this.decks[index].id!,this.deckEditText).subscribe((deck)=>{
      this.decks[index].name = deck.data.name;
    })
    this.deckToRename = -1;
  }

  addCard() {
    if (this.selectedDeckId !== -1) {
      this.deckService.addCard(this.selectedDeckId).subscribe((response) => {
        this.cards.push(response.data);
      });
    }
  }

  deleteCard(index: number) {
    const id = this.cards[index].id!;
    if (this.selectedCard === this.cards[index]) {
      this.cardQuestion = 'Selecione um deck para poder ver seus cards';
      this.cardResponse = '';
    }
    this.deckService.deleteCard(id).subscribe();

    this.cards.splice(index, 1);
  }

  restartText() {
    this.cardQuestion = this.selectedCard.question;
    this.cardResponse = this.selectedCard.response;

    this.questionTextBox_text = this.selectedCard.question;
    this.responseTextBox_text = this.selectedCard.response;
  }
}
