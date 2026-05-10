import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, ViewWillEnter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { FavouritesService } from '../services/favourites.service';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-favourites',
    templateUrl: 'favourites.page.html',
    styleUrl: 'favourites.page.scss',
    standalone: true,
    imports: [
        CommonModule,
            IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon
    ],
})
export class FavouritesPage implements ViewWillEnter {

    favourites: any = [];

    constructor(
        private favouritesService: FavouritesService,
        private movieService: MovieService,
        private dataService: DataService,
        private router: Router
    ){
        addIcons({ home });
    }

    //reload favourites every time the page is opened
     ionViewWillEnter() {
        this.favouritesService.getFavourites().then ((data: any) => {
            this.favourites = data;
            console.log(this.favourites);
        });
        
    }

    //store selected movie and go to movie details page
    openMovieDetails(movie: any) {
        this.dataService.selectedMovie = movie;
        this.router.navigate(['/movie-details']);
    }

    goHome(){
        this.router.navigate(['/home']);
    }

    getImageUrl(path: string) {
        return this.movieService.getImageUrl(path);
    }
}