import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICastContent } from '@shared/models/cast-content.interface';
import { IVideoContent } from '@shared/models/video-content.interface';
import { ImagePipe } from '@shared/Pipes/image.pipe';
import { MovieService } from '@shared/services/movie.service';
import { MovieModalCastComponent } from '../movie-modal-cast/movie-modal-cast.component';
import { RemoveSpecialCharPipe } from '@shared/Pipes/remove-special-char.pipe';



@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [CommonModule, ImagePipe, MovieModalCastComponent, RemoveSpecialCharPipe],
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.scss'
})
export class MovieModalComponent
{
  private readonly movieService = inject(MovieService)

  public readonly genres!: string[];
  public readonly date!: string;

  public readonly data!: IVideoContent;
  public readonly topcast!: ICastContent[];


  constructor(@Inject(MAT_DIALOG_DATA) public dat: any)
  {
    this.data = dat.content;
    this.topcast = dat.topCast;

    const data = this.data;

    this.genres = this.movieService.genreIdsToName(data.genre_ids);
    this.date = new Date(data.release_date).toDateString();
    data.original_language = data.original_language.toUpperCase();

    console.log(data);

    // clamping on sentence
    let tmp: string = data.overview;
    let tempLength: number = tmp.length;

    while (tempLength > 500) {
      // Don't take the look up until the last character because it will be a .
      const i: number = tmp.lastIndexOf('.', tempLength - 2);
      if (i > 0) {
        tmp = tmp.substring(0, i + 1);
        tempLength = tmp.length;
      }
      else {
        // avoid infite loop when big sentence
        tempLength = -1;
      }
    }

    data.overview = tmp;
  }
}
