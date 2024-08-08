import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { HeaderComponent } from '@core/components/header/header.component';
import { BannerComponent } from '@core/components/banner/banner.component';
import { MovieService } from '@shared/services/movie.service';
import { MovieCarouselComponent } from '@shared/movie-carousel/movie-carousel.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, MovieCarouselComponent],
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

  SignOut()
  {
    sessionStorage.removeItem("LoggedInUser");
    this.auth.signOut();
  }


  ngOnInit(): void
  {
    this.movieService.getMovies().subscribe(res =>
    {
      console.log(res);
    })
  }
}
