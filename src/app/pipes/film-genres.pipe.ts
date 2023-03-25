import { Pipe, PipeTransform } from '@angular/core';
import {FILM_GENRES} from "../constants/film-genres";
import {FilmGenre} from "../enums/film-genre.enum";

@Pipe({
  name: 'filmGenres'
})
export class FilmGenresPipe implements PipeTransform {
  public transform(value: number[]): string {
    console.log(value);
    return value.map((value: FilmGenre) => FILM_GENRES[value]).join(', ');
  }
}
