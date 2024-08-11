import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IVideoContent } from '@shared/models/video-content.interface';
import { DescriptionPipe } from '@shared/Pipes/description.pipe';
import { ImagePipe } from '@shared/Pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-movie-carousel-item',
  standalone: true,
  imports: [CommonModule, ImagePipe, DescriptionPipe],
  templateUrl: './movie-carousel-item.component.html',
  styleUrl: './movie-carousel-item.component.scss',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 0.95 }))
      ])
    ])
  ]
})
export class MovieCarouselItemComponent
{
  @Input({ required: true }) movie!: IVideoContent;
  @Input() onClicked!: (content: IVideoContent) => void;

  isHovered: Boolean = false;


  public startHover(): void
  {
    this.isHovered = true
  }

  public endHover(): void
  {
    this.isHovered = false
  }

  public onPressed(): void
  {
    if (this.onClicked == null) return;

    this.onClicked(this.movie);
  }
}