import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    with_genres: '',
    page: '1',
    sort_by: 'popularity.desc',
    with_keywords: '',
  },

  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTFjMDQyYzBlMjU2MjIyOWIyYTk3MDU4ZmIwMGUxNiIsIm5iZiI6MTcyMzI0MDcyMS40ODI1NDcsInN1YiI6IjY2YjNlNDhjZmZkMDU3MmRiYjI3ZDY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c3m8RSC4p8v15YH8dciuJ0Yx3sceDtt0SyfxlzMYd48'
  }
}
@Injectable({
  providedIn: 'root'
})


export class MovieService 
{
  private http = inject(HttpClient)
  private genreMap!: Map<number, string>;

  constructor() 
  {
    this.http.get<any>('https://api.themoviedb.org/3/genre/movie/list', options).subscribe(res =>
    {
      this.genreMap = new Map(
        res["genres"].map((genre: any) => [genre.id, genre.name])
      );
    })
  }

  public genreIdsToName(arr: number[]): string[]
  {

    const flt = Array.from(this.genreMap.entries())
      .filter(([id]) => arr.includes(id))  // Keep only those whose ID is in `arr`
      .map(([id, name]) => name);
    return flt;

  }

  public getMovies(keyword: string = '', genre: string = '') 
  {
    const newOptions = options;
    newOptions.params.with_genres = genre;
    newOptions.params.with_keywords = keyword;

    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', newOptions)
  }

  getTvShows()
  {
    return this.http.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getRatedMovies()
  {
    return this.http.get('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', options)
  }

  getBannerImage(id: number)
  {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number)
  {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number)
  {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies()
  {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies()
  {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated()
  {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies()
  {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }
}
