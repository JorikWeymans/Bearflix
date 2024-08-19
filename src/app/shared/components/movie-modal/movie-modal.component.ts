import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  readonly genres!: string[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: IVideoContent)
  {
    console.log(data);
    this.genres = this.movieService.genreIdsToName(this.data.genre_ids);
    console.log(this.genres);

  }
}
