import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Film} from "../interfaces/film.interface";
import {FILM_GENRES} from "../constants/film-genres";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data.json';
  public films$: Observable<Film[]> = this.getData();
  private genresFilm = FILM_GENRES;
  constructor(private http: HttpClient) { }
  public getData(): Observable<Film[]> {
    return this.http.get<any>(this.dataUrl);
  }

  public sortingByGenre(value: string): Observable<Film[]> {
    const genreId = Object.keys(this.genresFilm).find(key => this.genresFilm[Number(key)] === value);
    return this.films$.pipe(
      map(allFilms => allFilms.filter(film => film.genre.includes(Number(genreId)))),
    );
  }

  public searchFilmTitle(searchTerm: string): Observable<Film[]> {
    if (!searchTerm || (searchTerm.trim() === '')) {
      return this.films$;
    } else {
      return this.films$.pipe(
        map(films => films.filter(film => film.name.toLowerCase().startsWith(searchTerm.toLowerCase()))),
      )
    }
  }
}
