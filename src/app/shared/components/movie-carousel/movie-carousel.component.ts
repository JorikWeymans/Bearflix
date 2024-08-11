import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IVideoContent } from '@shared/models/video-content.interface';
import { DescriptionPipe } from '@shared/Pipes/description.pipe';
import { ImagePipe } from '@shared/Pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

import Swiper from 'swiper';
import { MovieCarouselItemComponent } from "../movie-carousel-item/movie-carousel-item.component";


@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule, DescriptionPipe, ImagePipe, MovieCarouselItemComponent],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',

})

export class MovieCarouselComponent implements AfterViewInit, OnInit
{
  @Input() videoContents: IVideoContent[] = []
  @Input() title!: string;
  @Input({ required: true }) onItemClicked!: (content: IVideoContent) => void;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef
  @ViewChild(MovieCarouselItemComponent) movieCarouselItem!: MovieCarouselItemComponent;
  selectedContent: string | null = null;

  constructor() { }
  ngOnInit(): void
  {

  }
  ngAfterViewInit(): void
  {
    this.initSwiper();
  }


  private initSwiper()
  {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    })
  }

  setHoverMovie(movie: IVideoContent)
  {
    this.movieCarouselItem.startHover();
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie()
  {
    this.movieCarouselItem.endHover();
    this.selectedContent = null;
  }

  public onMoviePressed(): void
  {

  }
  public t(content: IVideoContent): void
  {
    console.log(content);
  }

}
