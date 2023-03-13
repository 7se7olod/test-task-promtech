import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {FILM_FAVORITE_KEY} from "../constants/film-favorite-key";
import {Film} from "../app.component";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class FavoriteFilmService {
  public favoriteFilmId$ = new BehaviorSubject<number>(this.localStorageService.getFromLocalStorage(FILM_FAVORITE_KEY) || null);
  private films$: Observable<Film[]> = this.dataService.getData();
  private currentFavoriteFilm$ = new BehaviorSubject(null);

  constructor(private localStorageService: LocalStorageService,
              private dataService: DataService) { }

  public setToFavoriteFilm(id: number): void {
    const savedFilmId = this.localStorageService.getFromLocalStorage(FILM_FAVORITE_KEY);
    if (savedFilmId === id) {
      this.favoriteFilmId$.next(null);
      this.localStorageService.removeFromLocalStorage(FILM_FAVORITE_KEY);
      return;
    }
    this.favoriteFilmId$.next(id);
    this.localStorageService.setToLocalStorage(FILM_FAVORITE_KEY, id);
  }

  public updateFavoriteCard(): Observable<Film> {
    const currentFilmID = this.localStorageService.getFromLocalStorage(FILM_FAVORITE_KEY);
    this.films$.subscribe(films => {
      const filmsData: Film[] = films;
      this.currentFavoriteFilm$.next(filmsData.find(film => film.id === currentFilmID));
    });
    return this.currentFavoriteFilm$;
  }
}
