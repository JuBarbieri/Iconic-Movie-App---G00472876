import { Componet } from '@angular/core';
import { CommonModule } from '@angular/commmon';
import { Router } from '@angular/router';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, ViewWillEnter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { MovieService } from '../services/movie.service';
import { FavouritesService } from '../services/favourites.service';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: 'movie-details.page.html',
    styleUrl: ['movie-details.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
            IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon
    ],
})
export class MovieDetailsPage implements ViewWillEnter{
    
    movie: any;
    cast: any = [];
    crew: any = [];
    isFavourite = false;

    constructor(
        private router: Router,
        private movieService: MovieService,
        private favouritesService: FavouritesService,
        private dataService: DataService
    ){
        addIcons({ home, heart });
    }

    //runs every time the page is opened
    async ionViewWillEnter() {
        this.movie = this.dataService.selectedMovie;

        if (this.movie){
            this.isFavourite = await this.favouritesService.isFavourite(this.movie.id);
            this.cast = data.cast;
            this.crew = data.crew;
            console.log(this.cast);
        }
    }

    //toggle between add and remove favourite
    async toggleFavourite() {
        if(this.isFavourite) {
            await this.favouritesService.removeFavourite(this.movie.id);
        } else{
            await this.favouritesService.addFavourite(this.movie);
        }
        this.isFavourite = !this.isFavourite;
    }

    //store selected person and go to details page
    openPersonDetails(person: any) {
        this.dataService.selectedPerson = person;
        this.router.navigate(['/details']);
    }

    goHome(){
        this.router.navigate(['/home']);
    }

    goToFavourites(){
        this.router.navigate(['/favourites']);
    }

    goImageUrl(path: string) {
        return this.movieService.getImageUrl(path);
    }
}