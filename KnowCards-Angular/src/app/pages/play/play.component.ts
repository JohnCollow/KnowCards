import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { counter } from 'src/app/interfaces/counter';
import { deck } from 'src/app/interfaces/deck';
import { DeckService } from 'src/app/services/deck.service';

// 0 = Easy
// 1 = Normal
// 2 = Hard
// 3 = Wrong

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit{

  ngOnInit(): void {
    this.counter = {
      easy: this.easyCount,
      hard: this.hardCount,
      wrong: this.wrongCount,
    };
    this.card = this.chooseCard();
    this.textCard = this.card.question;
  }

  constructor(private deckService: DeckService) {}

  turned: boolean = false;
  card!: card;

  counter!: counter;

  easyCount: number = 12;
  hardCount: number = 5;
  wrongCount: number = 3;

  deck: deck = this.deckService.getATestDeck();

  textCard!: string;

  showCard() {
    this.turned = true;
    this.textCard = this.card.response;
  }

  nextCard(difficultyOption: number) {
    this.turned = false;
    this.counterOperations();
    this.card.difficulty = difficultyOption;
    this.card = this.chooseCard();

    this.textCard = this.card.question;
  }

  counterOperations(): void {
    //Reduz os contadores e reseta caso tenha sido escolhido
    let hasEasy: boolean = false;
    let hasHard: boolean = false;
    let hasWrong: boolean = false;

    this.deck.cards.forEach((card) => {
      if (card.difficulty == 3) {
        hasWrong = true;
      }
      if (card.difficulty == 2) {
        hasHard = true;
      }
      if (card.difficulty == 0) {
        hasEasy = true;
      }
    });

    if (hasWrong) {
      this.counter.wrong -= 1;
    }
    if (hasHard) {
      this.counter.hard -= 1;
    }
    if (hasEasy) {
      this.counter.easy -= 1;
    }

    switch (this.card.difficulty) {
      case 0:
        {
          this.counter.easy = this.easyCount;
        }
        break;
      case 2:
        {
          this.counter.hard = this.hardCount;
        }
        break;
      case 3: {
        this.counter.wrong = this.wrongCount;
      }
    }
  }

  chooseCard(): card {
    //Wrong
    if (this.counter.wrong <= 0) {
      var filteredCards: card[] = this.filterCardsByDifficulty(3);
      if (filteredCards.length > 0) {
        console.log('Mostrando uma errada!');
        return filteredCards[this.randomNum(0, filteredCards.length - 1)];
      } else {
        console.log('Não tinha errada!');
      }
    }
    //Hard
    if (this.counter.hard <= 0) {
      var filteredCards: card[] = this.filterCardsByDifficulty(2);
      if (filteredCards.length > 0) {
        console.log('Mostrando uma dificil!');
        return filteredCards[this.randomNum(0, filteredCards.length - 1)];
      } else {
        console.log('Não tinha dificil!');
      }
    }
    //Easy
    if (this.counter.easy <= 0) {
      var filteredCards: card[] = this.filterCardsByDifficulty(0);
      if (filteredCards.length > 0) {
        console.log('Mostrando uma facil!');
        return filteredCards[this.randomNum(0, filteredCards.length - 1)];
      } else {
        console.log('Não tinha facil!');
      }
    }
    //Normal
    var filteredCards: card[] = this.filterCardsByDifficulty(1);
    console.log('Mostrando uma normal');

    return filteredCards[this.randomNum(0, filteredCards.length - 1)];
  }

  filterCardsByDifficulty(difficulty: number): card[] {
    var cardsToChoose: card[] = [];
    this.deck.cards.forEach((item) => {
      if (item.difficulty == difficulty) {
        console.log(item.difficulty + ' = ' + difficulty);

        cardsToChoose.push(item);
      }
    });
    console.log('dificuldade:' + difficulty + ' | ' + cardsToChoose.length);
    return cardsToChoose;
  }

  randomNum(min: number, max: number) {
    var num = Math.random();
    while (num == 1) {
      num = Math.random();
    }

    return Math.floor(num * (max - min + 1)) + min;
  }
}
