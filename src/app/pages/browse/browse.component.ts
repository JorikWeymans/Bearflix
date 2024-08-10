import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared/services/auth.service';
import { MovieCarouselComponent } from '@shared/components/movie-carousel/movie-carousel.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { BannerComponent } from '@core/components/banner/banner.component';
import { MovieService } from '@shared/services/movie.service';
import { IVideoContent } from '@shared/models/video-content.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { FooterComponent } from "../../browse/footer/footer.component";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent, FooterComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit
{

  auth = inject(AuthService)
  movieService = inject(MovieService)

  name = JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;
  profileImage = JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("LoggedInUser")!).email;

  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();


  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];


  sources =
    [
      this.movieService.getMovies(),
      this.movieService.getTvShows(),
      this.movieService.getTopRated(),
      //this.movieService.getRatedMovies(),
      this.movieService.getNowPlayingMovies(),
      this.movieService.getUpcomingMovies(),
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
        map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular/*, topRated*/]) =>
        {
          this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[0].id);
          this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[0].id);

          return { movies, tvShows, ratedMovies, nowPlaying, upcoming, popular/*, topRated */ }
        })
      ).subscribe((res: any) =>
      {
        this.movies = res.movies.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.ratedMovies = res.ratedMovies.results as IVideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
        this.upcomingMovies = res.upcoming.results as IVideoContent[];
        this.popularMovies = res.popular.results as IVideoContent[];
        /*this.topRatedMovies = res.topRated.results as IVideoContent[];*/
      })
  }
}
