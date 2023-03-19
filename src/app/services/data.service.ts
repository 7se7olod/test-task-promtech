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
  public sortedFilms$: Observable<Film[]> = this.films$;
  private genresFilm = FILM_GENRES;
  constructor(private http: HttpClient) { }
  private getData(): Observable<Film[]> {
    return this.http.get<any>(this.dataUrl);
  }

  public sortingByGenre(value: string): Observable<Film[]> {
    const genreId = Object.keys(this.genresFilm).find(key => this.genresFilm[Number(key)] === value);
    this.sortedFilms$ = this.films$.pipe(map(allFilms => allFilms.filter(film => film.genre.includes(Number(genreId)))));
    return this.films$.pipe(
      map(allFilms => allFilms.filter(film => film.genre.includes(Number(genreId)))),
    );
  }

  public searchFilmTitle(searchTerm: string): Observable<Film[]> {
      return this.sortedFilms$.pipe(
        map(films => films.filter(film => film.name.toLowerCase().startsWith(searchTerm.trim().toLowerCase()))),
      )
  }
}
