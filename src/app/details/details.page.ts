import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
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
        private navCtrl: NavController,
        private movieService: MovieService,
        private dataService: DataService
    ){
        addIcons({ home, heart });
    }

    // runs every time the page is opened
     ionViewWillEnter() {
        this.person = this.dataService.selectedPerson;
    

    if (this.person) {
        // get full details for this person
        this.movieService.getPersonDetails(this.person.id).subscribe((data: any) => {
            this.details = data;
            console.log(this.details);
        });
        

        //get movies this person has been in
        this.movieService.getPersonMovieCredits(this.person.id).subscribe((data: any) => {
            this.movies = data.cast;
        });
       
    }
}

// store selected movie and go to movie details page
openMovie(movie: any) {
    this.dataService.selectedMovie = movie;
    this.navCtrl.navigateForward(['/movie-details']);
}

goHome(){
    this.navCtrl.navigateForward(['/home']);
}

goToFavourites(){
    this.navCtrl.navigateForward(['/favourites']);
}

getImageUrl(path: string) {
    return this.movieService.getImageUrl(path);
}

}
