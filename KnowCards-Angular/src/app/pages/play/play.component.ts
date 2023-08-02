import { Component } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { counter } from 'src/app/interfaces/counter';
import { deck } from 'src/app/interfaces/deck';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent {
  turned: boolean = false;
  card!: card;

  counter!: counter;

  easyCount: number = 12;
  hardCount: number = 5;
  wrongCount: number = 3;

  cartas: card[] = [
    { question: 'あ', response: 'a', priority: 1 },
    { question: 'い', response: 'i', priority: 1 },
    { question: 'う', response: 'u', priority: 1 },
    { question: 'え', response: 'e', priority: 1 },
    { question: 'お', response: 'o', priority: 1 },
    { question: 'か', response: 'ka', priority: 1 },
    { question: 'き', response: 'ki', priority: 1 },
    { question: 'く', response: 'ku', priority: 1 },
    { question: 'け', response: 'ke', priority: 1 },
    { question: 'こ', response: 'ko', priority: 1 },
    // { question: 'さ', response: 'sa', priority: 1 },
    // { question: 'し', response: 'shi', priority: 1 },
    // { question: 'す', response: 'su', priority: 1 },
    // { question: 'せ', response: 'se', priority: 1 },
    // { question: 'そ', response: 'so', priority: 1 },
    // { question: 'た', response: 'ta', priority: 1 },
    // { question: 'ち', response: 'chi', priority: 1 },
    // { question: 'つ', response: 'tsu', priority: 1 },
    // { question: 'て', response: 'te', priority: 1 },
    // { question: 'と', response: 'to', priority: 1 },
    // { question: 'な', response: 'na', priority: 1 },
    // { question: 'に', response: 'ni', priority: 1 },
    // { question: 'ぬ', response: 'nu', priority: 1 },
    // { question: 'ね', response: 'ne', priority: 1 },
    // { question: 'の', response: 'no', priority: 1 },
    // { question: 'は', response: 'ha', priority: 1 },
    // { question: 'ひ', response: 'hi', priority: 1 },
    // { question: 'ふ', response: 'fu', priority: 1 },
    // { question: 'へ', response: 'he', priority: 1 },
    // { question: 'ほ', response: 'ho', priority: 1 },
    // { question: 'ま', response: 'ma', priority: 1 },
    // { question: 'み', response: 'mi', priority: 1 },
    // { question: 'む', response: 'mu', priority: 1 },
    // { question: 'め', response: 'me', priority: 1 },
    // { question: 'も', response: 'mo', priority: 1 },
    // { question: 'や', response: 'ya', priority: 1 },
    // { question: 'ゆ', response: 'yu', priority: 1 },
    // { question: 'よ', response: 'yo', priority: 1 },
    // { question: 'ら', response: 'ra', priority: 1 },
    // { question: 'り', response: 'ri', priority: 1 },
    // { question: 'る', response: 'ru', priority: 1 },
    // { question: 'れ', response: 're', priority: 1 },
    // { question: 'ろ', response: 'ro', priority: 1 },
    // { question: 'わ', response: 'wa', priority: 1 },
    // { question: 'を', response: 'wo', priority: 1 },
    // { question: 'ん', response: 'n', priority: 1 },
  ];

  deck: deck = { name: 'hiragana', cards: this.cartas };

  textCard!: string;

  start() {
    this.counter = {
      easy: this.easyCount,
      hard: this.hardCount,
      wrong: this.wrongCount,
    };
    this.card = this.chooseCard();
    this.textCard = this.card.question;
  }

  showCard() {
    this.turned = true;
    this.textCard = this.card.response;
  }

  nextCard(difficultyOption: number) {
    this.turned = false;
    this.counterOperations();
    this.card.priority = difficultyOption;
    this.card = this.chooseCard();

    this.textCard = this.card.question;
  }

  counterOperations(): void {
    //Reduz os contadores e reseta caso tenha sido escolhido
    this.counter.easy -= 1;
    this.counter.hard -= 1;
    this.counter.wrong -= 1;

    switch (this.card.priority) {
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
      if (item.priority == difficulty) {
        console.log(item.priority + ' = ' + difficulty);

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

  testar(teste: string) {
    switch (teste) {
      case 'errada':
        console.log('A quantia de erradas é: ');
        break;
      case 'tudo':
        console.log(this.deck.cards);
        break;
      case '':
        console.log();
        break;
    }
  }
}
