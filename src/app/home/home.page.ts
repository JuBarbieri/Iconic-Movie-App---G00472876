import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/commmon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonInput, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrl: ['home.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonIcon, IonItem, IonInput, IonLabel 
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
        private router: Router

    ){
        addIcons({ heart });
    }

    async ngOnInit() {
        await this.loadTrending();
    }

    //loads todays trending movies on startup
    async loadTrending() {
        this.listTitle = "Today's Trending Movies";
        const data = await this.movieService.getTrending();
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
    openMovie(movie: any){
        this.dataService.selectedMovie = movie;
        this.router.navigate(['/movie-details']);
    } 

    goToFavorites() {
        this.router.navigate(['/favourites']);
    }
    
    getImageUrl(path: string) {
        return this.movieService.getImageUrl(path);
    }
}