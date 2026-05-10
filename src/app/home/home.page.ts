import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonInput, IonLabel, ViewWillEnter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrl: 'home.page.scss',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonInput, IonLabel 
    ],
})
export class HomePage implements ViewWillEnter {

    studentNumber = 'G00472876';
    searchQuery = '';
    movies: any = [];
    listTitle = "Today's Trending Movies";

    constructor(
        private movieService: MovieService,
        private dataService: DataService,
        private router : Router

    ){
        addIcons({ heart });
    }

     ionViewWillEnter() {
       this.loadTrending();
    }

    //loads todays trending movies on startup
     async loadTrending() {
        this.listTitle = "Today's Trending Movies";
        const data = await  this.movieService.getTrending();
        this.movies = data.results;
        console.log(this.movies);
    }
        
    

    //called when search button is pressed 
     async onSearch() {
        if(this.searchQuery == '') {
            await this.loadTrending();
            return;
        }
        this.listTitle = this.searchQuery + ' Movies';
        const data = await this.movieService.searchMovies(this.searchQuery);
        this.movies = data.results;
       
    }

    //store selected movie and go to details page
    setMovie(movie: any){
        this.dataService.selectedMovie = movie;
       
    } 

    goToFavourites() {
        this.router.navigate(['/favourites']);
    }
    
    getImageUrl(path: string) {
        return this.movieService.getImageUrl(path);
    }
    
}
