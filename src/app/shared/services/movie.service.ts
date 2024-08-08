import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


const options = {
  params: {
    include_adult: 'true',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc',
  },

  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2U3MTFlMmY3NGZjYTIyYzgyOTQ5MTA3YWM2ZTE0NiIsIm5iZiI6MTcyMzE0ODA4Ny4wODE0Niwic3ViIjoiNjZiM2U0OGNmZmQwNTcyZGJiMjdkNjYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZuHZJK8Ddt0fqFDlJbf98ouT6dZJrcxNOA9SNUYa1kI'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MovieService
{
  http = inject(HttpClient)

  constructor() { }

  public getMovies()
  {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

}
