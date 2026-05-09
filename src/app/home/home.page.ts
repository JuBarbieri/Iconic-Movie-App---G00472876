import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonInput, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular/standalone';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrl: 'home.page.scss',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonInput, IonLabel 
    ],
})
export class HomePage implements OnInit {

    studentNumber = 'G00472876';
    searchQuery = '';
    movies: any = [];
    listTitle = "Today's Trending Movies";

    constructor(
        private movieService: MovieService,
        private dataService: DataService,
        private navCtrl: NavController

    ){
        addIcons({ heart });
    }

     ngOnInit() {
       this.loadTrending();
    }

    //loads todays trending movies on startup
     loadTrending() {
        this.listTitle = "Today's Trending Movies";
        this.movieService.getTrending().subscribe((data: any) => {
            this.movies = data.results;
            console.log(this.movies);
        });
        
    }

    //called when search button is pressed 
     onSearch() {
        if(this.searchQuery == '') {
            this.loadTrending();
            return;
        }
        this.listTitle = this.searchQuery + ' Movies';
       this.movieService.searchMovies(this.searchQuery).subscribe((data: any) => {
        this.movies = data.results;
       });
    }

    //store selected movie and go to details page
    openMovie(movie: any){
        this.dataService.selectedMovie = movie;
        this.navCtrl.navigateForward(['/movie-details']);
    } 

    goToFavourites() {
        this.navCtrl.navigateForward(['/favourites']);
    }
    
    getImageUrl(path: string) {
        return this.movieService.getImageUrl(path);
    }
    
}
