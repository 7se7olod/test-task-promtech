import {Component} from '@angular/core';
import {DataService} from "./services/data.service";
import {Observable} from "rxjs";
import {FavoriteFilmService} from "./services/favorite-film.service";
import {FILM_GENRES} from "./constants/film-genres";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {Film} from "./interfaces/film.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public films$: Observable<Film[]> = this.dataService.films$;
  public favoriteFilmId$: Observable<number> = this.favoriteFilmService.favoriteFilmId$;
  public currentFavoriteFilm$ = this.favoriteFilmService.updateFavoriteCard();
  public allGenres: string[] = Object.values(FILM_GENRES);
  public searchTerm: string = '';
  public currentGenre: string = '';
  private dialogRef: MatDialogRef<DialogComponent>;

  constructor(
    private dataService: DataService,
    private favoriteFilmService: FavoriteFilmService,
    private dialog: MatDialog) {
  }

  public openDialogFilm(film: Film): void {
    this.dialogRef = this.dialog.open(DialogComponent, {data: film});
    this.dialogRef.afterClosed().subscribe();
  }

  public onSaveFilm(id: number): void {
    this.favoriteFilmService.addToFavoriteFilm(id)
    this.currentFavoriteFilm$ = this.favoriteFilmService.updateFavoriteCard();
  }

  public showAllFilms(): void {
    this.films$ = this.dataService.films$;
  }

  public sortingByGenre(genre: string): void {
    if (genre) {
      this.currentGenre = genre;
      this.films$ = this.dataService.sortingByGenre(genre);
    } else {
      this.films$ = this.dataService.films$;
    }
  }

  public searchFilmTitle(): void {
    if (this.searchTerm) {
      this.films$ = this.dataService.searchFilmTitle(this.searchTerm);
    } else {
      this.sortingByGenre(this.currentGenre);
    }
  }
}
