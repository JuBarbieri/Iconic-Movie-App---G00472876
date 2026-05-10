import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, ViewWillEnter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-details',
    templateUrl: 'details.page.html',
    styleUrl: 'details.page.scss',
    standalone: true,
    imports: [
        CommonModule,
            IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon
    ],
})
export class DetailsPage implements ViewWillEnter {

    person: any;
    details: any;
    movies: any =[];

    constructor(
        private router: Router,
        private movieService: MovieService,
        private dataService: DataService
    ){
        addIcons({ home, heart });
    }

    // runs every time the page is opened
     async ionViewWillEnter() {
        this.person = this.dataService.selectedPerson;
    

    if (this.person) {
        // get full details for this person
        this.details = await this.movieService.getPersonDetails(this.person.id);
        console.log(this.details);
        
        

        //get movies this person has been in
        const data = await this.movieService.getPersonMovieCredits(this.person.id);
            this.movies = data.cast;
        }
       
    }


    // store selected movie and go to movie details page
    openMovie(movie: any) {
        this.dataService.selectedMovie = movie;
        this.router.navigate(['/movie-details']);
    }

    goHome(){
        this.router.navigate(['/home']);
    }

    goToFavourites(){
        this.router.navigate(['/favourites']);
    }

    getImageUrl(path: string) {
        return this.movieService.getImageUrl(path);
    }

}
