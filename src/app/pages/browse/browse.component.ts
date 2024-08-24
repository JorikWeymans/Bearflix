import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared/services/auth.service';
import { MovieCarouselComponent } from '@shared/components/movie-carousel/movie-carousel.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { BannerComponent } from '@core/components/banner/banner.component';
import { MovieService } from '@shared/services/movie.service';
import { IVideoContent } from '@shared/models/video-content.interface';
import { forkJoin, map, Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MovieModalComponent } from '@shared/components/movie-modal/movie-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICastContent } from '@shared/models/cast-content.interface';
import { FooterComponent } from '@core/components/footer/footer.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent, FooterComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit
{
  readonly auth = inject(AuthService)
  readonly movieService = inject(MovieService)

  name = JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;
  profileImage = JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("LoggedInUser")!).email;

  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();
  bannerContent!: IVideoContent;

  bearMovies: IVideoContent[] = [];
  classicMovies: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];


  constructor(public dialog: MatDialog)
  {
    this.openMovieModal = this.openMovieModal.bind(this);
  }
  sources =
    [
      this.movieService.getMovies('10468', '16'),
      this.movieService.getMovies('193099'),
      this.movieService.getPopularMovies(),
    ];

  SignOut()
  {
    sessionStorage.removeItem("LoggedInUser");
    this.auth.signOut();
  }

  ngOnInit(): void
  {
    forkJoin(this.sources)
      .pipe(
        map(([bearMovies, classicMovies, ratedMovies]) =>
        {
          bearMovies.results = bearMovies.results.filter((item: IVideoContent) => item.id !== 62177);
          classicMovies.results = classicMovies.results.filter((item: IVideoContent) => item.id !== 44925 && item.id !== 1308871);
          this.bannerDetail$ = this.movieService.getBannerDetail(bearMovies.results[0].id);
          this.bannerVideo$ = this.movieService.getBannerVideo(bearMovies.results[0].id);
          this.bannerContent = bearMovies.results[0];

          return { bearMovies, classicMovies, ratedMovies }
        })
      ).subscribe((res: any) =>
      {
        this.bearMovies = res.bearMovies.results as IVideoContent[];
        this.classicMovies = res.classicMovies.results as IVideoContent[];
        this.ratedMovies = res.ratedMovies.results as IVideoContent[];
      })
  }

  public openMovieModal(content: IVideoContent): void
  {
    let topCast!: ICastContent[];
    this.movieService.getCredits(content.id).subscribe((res: any) =>
    {
      topCast = res.cast.slice(0, 3).map((e: any) =>
      {
        e.profile_path = `https://image.tmdb.org/t/p/w500${e.profile_path}`;
        return e as ICastContent;
      }
      );

      this.dialog.open(MovieModalComponent, {
        width: '1000px',
        height: '600px',

        maxWidth: '1500px',
        maxHeight: '800px',

        panelClass: 'custom-dialog-container',
        data: {
          content: content,
          topCast: topCast,
        }
      });
    })
  }

}