import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Film} from "../app.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

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
  private dialogRef: MatDialogRef<DialogComponent>;

  constructor(private dialog: MatDialog) {}

  // to appComponent
  public openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: this.filmData
    });
    this.dialogRef.afterClosed().subscribe();
  }

  public toggleIsFavoriteFilm(event: Event) {
    event.stopPropagation();
    this.changeFavorite.emit()
  }
}
