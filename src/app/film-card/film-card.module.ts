import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilmCardComponent} from "./film-card.component";
import {FilmGenresPipe} from "../pipes/film-genres.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";



@NgModule({
  declarations: [
    FilmCardComponent,
    FilmGenresPipe,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    FilmCardComponent,
    FilmGenresPipe,
    DialogComponent
  ]
})
export class FilmCardModule { }
