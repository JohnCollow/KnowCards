import { Component, OnInit } from '@angular/core';
import { deck } from 'src/app/interfaces/deck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor( private deckService: DeckService) {}
  play:boolean = false;
  decks: deck[] = [];
  selectedDeck!:deck;


  ngOnInit(): void {
      this.deckService.getAllDecks().subscribe((response) => {
        this.decks = response.data;
      });
  }

  start(index:number) {

    if(this.decks[index].cards.length === 0){
      alert("Este deck está vazio, selecione outro ou crie cards para este deck")
    }else{
      this.selectedDeck = this.decks[index]
      this.play = true;
    }
  }
}
