import {Component} from '@angular/core';
import {DataService} from "./services/data.service";
import {Observable, of} from "rxjs";
import {FavoriteFilmService} from "./services/favorite-film.service";
import {FILM_GENRES} from "./constants/film-genres";

export interface Film {
  "id": number;
  "name": string;
  "year": number;
  "description": string;
  "genre": number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public films$: Observable<Film[]> = this.dataService.getData();
  private allFilms: Film[];
  private filteredFilms: Film[];
  public selectedGenre: number;
  public favoriteFilmId$: Observable<number> = this.favoriteFilmService.favoriteFilmId$;
  public currentFavoriteFilm$ = this.favoriteFilmService.updateFavoriteCard();
  private genresFilm = FILM_GENRES;
  public allGenres: string[] = [];
  public searchTerm: string;

  constructor(
    private dataService: DataService,
    private favoriteFilmService: FavoriteFilmService) {

    for (let key in this.genresFilm) {
      this.allGenres.push(this.genresFilm[key]);
    }

    this.films$
      .subscribe(films => {
        this.allFilms = films;
        this.filteredFilms = films;
      });
  }

  public onSaveFilm(id: number): void {
    this.favoriteFilmService.setToFavoriteFilm(id);
    this.currentFavoriteFilm$ = this.favoriteFilmService.updateFavoriteCard();
  }

  public showAllFilms(): void {
    this.films$ = this.dataService.getData();
  }

  public updateListFilms(value: string): void {
    const genreId = Object.keys(this.genresFilm).find(key => this.genresFilm[Number(key)] === value);
    this.selectedGenre = Number(genreId);
    this.filteredFilms = this.allFilms.filter(film => film.genre.includes(Number(genreId)));
    this.films$ = of(this.filteredFilms);
  }

  public search(): void {
    if (!this.searchTerm || (this.searchTerm.trim() === '')) {
      this.filteredFilms = this.allFilms;
      this.films$ = of(this.filteredFilms);
    } else {
      this.filteredFilms = this.filteredFilms.filter(film => film.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.films$ = of(this.filteredFilms);
    }
  }
}
