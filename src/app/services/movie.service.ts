import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

//base urls for the api and images
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
    providedIn: 'root'
})
export class MovieService{
    
    constructor() { }

    //get todays trending movies
     async getTrending() {
        const options: HttpOptions ={
            url: BASE_URL + '/trending/movie/day?api_key=' + environment.apiKey
        };
        const response = await CapacitorHttp.get(options);
        return response.data;
    
     
    }

    //search movies by name
     async searchMovies(query: string) {
        const options: HttpOptions = {
            url: BASE_URL + '/search/movie?query=' + query + '&api_key=' + environment.apiKey
        };
        const response = await CapacitorHttp.get(options);
        return response.data;
     
      }

    //get cast and crew for a movie
     async getMovieCredits(movieId: any){
        const options: HttpOptions = {
            url: BASE_URL + '/movie/' + movieId + '/credits?api_key=' + environment.apiKey
        };
        const response = await CapacitorHttp.get(options);
        return response.data;
        
    }

    //get details for a person
     async getPersonDetails(personId: any){
        const options: HttpOptions = {
            url: BASE_URL + '/person/' + personId + '?api_key=' + environment.apiKey
        };
        const response = await CapacitorHttp.get(options);
        return response.data;
    }

    //get movies a person has been in
     async getPersonMovieCredits(personId: any) {
        const options: HttpOptions = {
            url: BASE_URL + '/person/' + personId + '/movie_credits?api_key=' + environment.apiKey
        };
        const response = await CapacitorHttp.get(options);
        return response.data;
        
    }

    //builds the full image url from the path returned by the api
    getImageUrl(path: string){
        if (!path){
            return '';
        }
        return IMG_URL + path;
    }
}