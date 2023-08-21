import { Injectable } from '@angular/core';
import { deck } from '../interfaces/deck';
import { card } from '../interfaces/card';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { response } from '../interfaces/response';



@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private http:HttpClient) {}

  baseApiUrl:string="http://127.0.0.1:3333"

  getAllDecks():Observable<response<deck[]>>{
    return this.http.get<response<deck[]>>(`${this.baseApiUrl}/api/deck`)
  }

  addDeck():Observable<response<deck>>{
    const deck:deck = {name:"Novo Deck",cards:[]}
    return this.http.post<response<deck>>(`${this.baseApiUrl}/api/deck`,deck)
  }

  deleteDeck(id:number){
    return this.http.delete(`${this.baseApiUrl}/api/deck/${id}`)
  }

  addCard(id:number):Observable<response<card>>{
    const card:card = {question:"Novo Card",response:"Novo Card",difficulty:1};
    return this.http.post<response<card>>(`${this.baseApiUrl}/api/card/${id}`,card)
  }

  UpdateACard(card:card):Observable<response<card>>{
    console.log(card);
    return this.http.put<response<card>>(`${this.baseApiUrl}/api/card/${card.id}`,card)
  }

  getATestDeck() {
    const testDeck: deck = {
      name: 'hiragana',
      cards: [
        { question: 'あ', response: 'a', difficulty: 1 },
        { question: 'い', response: 'i', difficulty: 1 },
        { question: 'う', response: 'u', difficulty: 1 },
        { question: 'え', response: 'e', difficulty: 1 },
        { question: 'お', response: 'o', difficulty: 1 },
        { question: 'か', response: 'ka', difficulty: 1 },
        { question: 'き', response: 'ki', difficulty: 1 },
        { question: 'く', response: 'ku', difficulty: 1 },
        { question: 'け', response: 'ke', difficulty: 1 },
        { question: 'こ', response: 'ko', difficulty: 1 },
        { question: 'さ', response: 'sa', difficulty: 1 },
        { question: 'し', response: 'shi', difficulty: 1 },
        { question: 'す', response: 'su', difficulty: 1 },
        { question: 'せ', response: 'se', difficulty: 1 },
        { question: 'そ', response: 'so', difficulty: 1 },
        { question: 'た', response: 'ta', difficulty: 1 },
        { question: 'ち', response: 'chi', difficulty: 1 },
        { question: 'つ', response: 'tsu', difficulty: 1 },
        { question: 'て', response: 'te', difficulty: 1 },
        { question: 'と', response: 'to', difficulty: 1 },
        { question: 'な', response: 'na', difficulty: 1 },
        { question: 'に', response: 'ni', difficulty: 1 },
        { question: 'ぬ', response: 'nu', difficulty: 1 },
        { question: 'ね', response: 'ne', difficulty: 1 },
        { question: 'の', response: 'no', difficulty: 1 },
        { question: 'は', response: 'ha', difficulty: 1 },
        { question: 'ひ', response: 'hi', difficulty: 1 },
        { question: 'ふ', response: 'fu', difficulty: 1 },
        { question: 'へ', response: 'he', difficulty: 1 },
        { question: 'ほ', response: 'ho', difficulty: 1 },
        { question: 'ま', response: 'ma', difficulty: 1 },
        { question: 'み', response: 'mi', difficulty: 1 },
        { question: 'む', response: 'mu', difficulty: 1 },
        { question: 'め', response: 'me', difficulty: 1 },
        { question: 'も', response: 'mo', difficulty: 1 },
        { question: 'や', response: 'ya', difficulty: 1 },
        { question: 'ゆ', response: 'yu', difficulty: 1 },
        { question: 'よ', response: 'yo', difficulty: 1 },
        { question: 'ら', response: 'ra', difficulty: 1 },
        { question: 'り', response: 'ri', difficulty: 1 },
        { question: 'る', response: 'ru', difficulty: 1 },
        { question: 'れ', response: 're', difficulty: 1 },
        { question: 'ろ', response: 'ro', difficulty: 1 },
        { question: 'わ', response: 'wa', difficulty: 1 },
        { question: 'を', response: 'wo', difficulty: 1 },
        { question: 'ん', response: 'n', difficulty: 1 },
      ],
    };
    return testDeck;
  }

  hiraganaWordsTest() {
    const testDeck: deck = {
      name: 'hiragana words',
      cards: [
        { question: 'おはよう', response: 'olá!', difficulty: 1 },
        { question: 'かぞく', response: 'Família', difficulty: 1 },
        { question: 'ともだち', response: 'amigo', difficulty: 1 },
        { question: 'いえ', response: 'lar', difficulty: 1 },
        { question: 'いええ', response: 'não', difficulty: 1 },
        { question: 'はい', response: 'sim', difficulty: 1 },
      ],
    };
    return testDeck;
  }
}
