import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

//base urls for the api and images
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
    providedIn: 'root'
})
export class MovieService{
    
    constructor(private http: HttpClient) { }

    //get todays trending movies
     getTrending() {
        return this.http.get(BASE_URL + '/trending/movie/day?api_key=' + environment.apiKey);
    
     
    }

    //search movies by name
     searchMovies(query: string) {
        return this.http.get(BASE_URL + '/search/movie?query=' + query + '&api_key=' + environment.apiKey);
     
      }

    //get cast and crew for a movie
     getMovieCredits(movieId: any){
        return this.http.get(BASE_URL + '/movie/' + movieId + '/credits?api_key=' + environment.apiKey);
        
    }

    //get details for a person
     getPersonDetails(personId: any){
        return this.http.get(BASE_URL + '/person/' + personId + '?api_key=' + environment.apiKey)
    }

    //get movies a person has been in
     getPersonMovieCredits(personId: any) {
        return this.http.get(BASE_URL + '/person/' + personId + '/movie_credits?api_key=' + environment.apiKey)
        
    }

    //builds the full image url from the path returned by the api
    getImageUrl(path: string){
        if (!path){
            return '';
        }
        return IMG_URL + path;
    }
}