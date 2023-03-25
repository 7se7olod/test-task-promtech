import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Film} from "../interfaces/film.interface";
import {FilmGenre} from "../enums/film-genre.enum";
import {FILM_GENRES} from "../constants/film-genres";

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})

export class FilmCardComponent {
  @Input() filmData: Film;
  @Input() isFavoriteFilm: boolean;
  @Input() isFavoriteButton: boolean;
  @Output() changeFavorite = new EventEmitter<void>();

  constructor() {}

  public toggleIsFavoriteFilm(event: Event) {
    event.stopPropagation();
    this.changeFavorite.emit()
  }

  kek(value: any) {
    console.log(value)
    return value.map((value: FilmGenre) => FILM_GENRES[value]).join(', ');
  }
}
