import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilmCardComponent} from "./film-card.component";
import {FilmGenresPipe} from "../pipes/film-genres.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    FilmCardComponent,
    FilmGenresPipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    FilmCardComponent,
    FilmGenresPipe
  ]
})
export class FilmCardModule { }
