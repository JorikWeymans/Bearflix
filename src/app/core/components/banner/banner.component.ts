import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IVideoContent } from '@shared/models/video-content.interface';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnChanges
{
  @Input({ required: true }) title = '';
  @Input({ required: true }) overview = '';
  @Input({ required: true }) key = 'm4NCribDx4U';
  @Input({ required: true }) content!: IVideoContent;
  @Input({ required: true }) onReadMore!: (content: IVideoContent) => void;

  constructor()
  {

  }
  public isPlaying: boolean = true;

  private sanitizer = inject(DomSanitizer)
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=${this.isPlaying ? 1 : 0}&mute=1&loop=1&controls=0`);
  public ngOnChanges(changes: SimpleChanges): void
  {
    if (changes['key']) {
      if (this.isPlaying)
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=${this.isPlaying ? 1 : 0}&mute=1&loop=1&controls=0`);
    }
  }

  public playButtonClicked()
  {
    this.isPlaying = !this.isPlaying;
    console.log(this.isPlaying);

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=${this.isPlaying ? 1 : 0}&mute=1&loop=1&controls=0`);

  }

  public onReadMoreclicked()
  {
    this.onReadMore(this.content);
  }
}
