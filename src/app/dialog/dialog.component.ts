import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmCardComponent} from "../film-card/film-card.component";
import {Film} from "../app.component";
import {FavoriteFilmService} from "../services/favorite-film.service";
import {LocalStorageService} from "../services/local-storage.service";
import {FILM_FAVORITE_KEY} from "../constants/film-favorite-key";

@Component({
  selector: 'app-dialog-film',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public isVeryFavoriteFilm: boolean;
  private favoriteFilmId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public filmData: Film,
    private dialogRef: MatDialogRef<FilmCardComponent>,
    private favoriteFilmService: FavoriteFilmService,
    private localStorageService: LocalStorageService) {
    this.favoriteFilmId = this.localStorageService.getFromLocalStorage(FILM_FAVORITE_KEY);
    this.isVeryFavoriteFilm = (this.favoriteFilmId === filmData.id);
  }

  public onCloseDialog(): void {
    this.dialogRef.close();
  }

  public addToFavoriteFilm() {
    this.isVeryFavoriteFilm = !this.isVeryFavoriteFilm;
    this.favoriteFilmService.setToFavoriteFilm(this.filmData.id);
    this.favoriteFilmService.updateFavoriteCard();
  }
}
