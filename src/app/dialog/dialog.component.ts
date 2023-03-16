import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmCardComponent} from "../film-card/film-card.component";
import {Film} from "../interfaces/film.interface";
import {FavoriteFilmService} from "../services/favorite-film.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dialog-film',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public favoriteFilmId$: Observable<number> = this.favoriteFilmService.favoriteFilmId$;
  constructor(
    @Inject(MAT_DIALOG_DATA) public filmData: Film,
    private dialogRef: MatDialogRef<FilmCardComponent>,
    private favoriteFilmService: FavoriteFilmService) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }

  public toggleFavoriteFilm(filmID: number): void {
    this.favoriteFilmService.addToFavoriteFilm(filmID);
  }
}
