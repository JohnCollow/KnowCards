import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { DecksComponent } from './pages/decks/decks.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'play',component:PlayComponent},
  {path:'decks',component:DecksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
