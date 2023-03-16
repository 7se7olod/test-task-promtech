import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Film} from "../interfaces/film.interface";

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
}
