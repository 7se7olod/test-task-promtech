import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {FILM_FAVORITE_KEY} from "../constants/film-favorite-key";
import {Film} from "../interfaces/film.interface";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class FavoriteFilmService {
  public favoriteFilmId$ = new BehaviorSubject<number>(this.localStorageService.getFromLocalStorage(FILM_FAVORITE_KEY) || null);
  public films$: Observable<Film[]> = this.dataService.getData();
  private currentFavoriteFilm$ = new BehaviorSubject(null);

  constructor(private localStorageService: LocalStorageService,
              private dataService: DataService) {}

  public addToFavoriteFilm(filmID: number) {
    this.setToFavoriteFilm(filmID);
    const currentFilmID = this.localStorageService.getFromLocalStorage(FILM_FAVORITE_KEY);
    this.films$.subscribe(films => {
      this.currentFavoriteFilm$.next(films.find(film => film.id === currentFilmID));
    });
  }

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
      this.currentFavoriteFilm$.next(films.find(film => film.id === currentFilmID));
    });
    return this.currentFavoriteFilm$;
  }
}
