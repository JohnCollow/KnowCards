import { Component } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { deck } from 'src/app/interfaces/deck';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

turned:boolean = false;

cartas:card[] = [
  {'question':'あ','response':'a'},
  {'question':'い','response':'i'},
  {'question':'う','response':'u'},
  {'question':'え','response':'e'},
  {'question':'お','response':'o'},
  {'question':'か','response':'ka'},
  {'question':'き','response':'ki'},
  {'question':'く','response':'ku'},
  {'question':'け','response':'ke'},
  {'question':'こ','response':'ko'},
  {'question':'さ','response':'sa'},
  {'question':'し','response':'shi'},
  {'question':'す','response':'su'},
  {'question':'せ','response':'se'},
  {'question':'そ','response':'so'},
  {'question':'た','response':'ta'},
  {'question':'ち','response':'chi'},
  {'question':'つ','response':'tsu'},
  {'question':'て','response':'te'},
  {'question':'と','response':'to'},
  {'question':'な','response':'na'},
  {'question':'に','response':'ni'},
  {'question':'ぬ','response':'nu'},
  {'question':'ね','response':'ne'},
  {'question':'の','response':'no'},
  {'question':'は','response':'ha'},
  {'question':'ひ','response':'hi'},
  {'question':'ふ','response':'fu'},
  {'question':'へ','response':'he'},
  {'question':'ほ','response':'ho'},
  {'question':'ま','response':'ma'},
  {'question':'み','response':'mi'},
  {'question':'む','response':'mu'},
  {'question':'め','response':'me'},
  {'question':'も','response':'mo'},
  {'question':'や','response':'ya'},
  {'question':'ゆ','response':'yu'},
  {'question':'よ','response':'yo'},
  {'question':'ら','response':'ra'},
  {'question':'り','response':'ri'},
  {'question':'る','response':'ru'},
  {'question':'れ','response':'re'},
  {'question':'ろ','response':'ro'},
  {'question':'わ','response':'wa'},
  {'question':'を','response':'wo'},
  {'question':'ん','response':'n'},
]

deck:deck ={'name':'hiragana','cards': this.cartas}

cardNumber:number = 5;

textCard:string = this.deck.cards[this.cardNumber].question;


showCard(){
  this.turned = true;
  this.textCard = this.deck.cards[this.cardNumber].response;
}

nextCard(){
  this.turned = false;
  this.cardNumber +=1;
  this.textCard = this.deck.cards[this.cardNumber].question;
}

}
