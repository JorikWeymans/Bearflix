import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICastContent } from '@shared/models/cast-content.interface';
import { IVideoContent } from '@shared/models/video-content.interface';
import { ImagePipe } from '@shared/Pipes/image.pipe';
import { MovieService } from '@shared/services/movie.service';
@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [CommonModule, ImagePipe],
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

    console.log(data);

    console.log(dat.topCast);
    this.genres = this.movieService.genreIdsToName(data.genre_ids);
    this.date = new Date(data.release_date).toDateString();
    data.original_language = data.original_language.toUpperCase();
  }
}
