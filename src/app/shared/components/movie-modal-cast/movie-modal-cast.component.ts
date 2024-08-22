import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie-modal-cast',
  standalone: true,
  imports: [],
  templateUrl: './movie-modal-cast.component.html',
  styleUrl: './movie-modal-cast.component.css'
})

export class MovieModalCastComponent
{
  @ViewChild('posterImage') posterImage!: ElementRef<HTMLImageElement>;
  @Input({ required: true }) imageSource = '';

  public onImageLoad() 
  {
    this.posterImage.nativeElement.src = this.imageSource;
  }

  public onImageError()
  {
    this.imageSource = "assets/CastNotFound.png";
    this.posterImage.nativeElement.src = this.imageSource;
  }
}
