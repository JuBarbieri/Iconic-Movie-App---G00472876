import { Component , OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
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
    styleUrl: 'movie-details.page.scss',
    standalone: true,
    imports: [
        CommonModule,
            IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon
    ],
})
export class MovieDetailsPage implements OnInit{
    
    movie: any;
    cast: any = [];
    crew: any = [];
    isFavourite = false;

    constructor(
        private navCtrl: NavController,
        private movieService: MovieService,
        private favouritesService: FavouritesService,
        private dataService: DataService,
        private cdr: ChangeDetectorRef
    ){
        addIcons({ home, heart });
        //get the selected movie as soon as the component is created
        this.movie = this.dataService.selectedMovie;
    }

    //runs every time the page is opened
     ngOnInit() {
        

        if (this.movie){
            this.favouritesService.isFavourite(this.movie.id).then((result: any) =>{
              this.isFavourite = result; 
              this.cdr.detectChanges(); 
            });

            //get cast and crew for this movie
            this.movieService.getMovieCredits(this.movie.id).subscribe((data: any) => {
                this.cast = data.cast;
                this.crew = data.crew;
                this.cdr.detectChanges();
                console.log(this.cast);
            });
            
        }
    }

    //toggle between add and remove favourite
     toggleFavourite() {
        if(this.isFavourite) {
             this.favouritesService.removeFavourite(this.movie.id);
        } else{
             this.favouritesService.addFavourite(this.movie);
        }
        this.isFavourite = !this.isFavourite;
    }

    //store selected person and go to details page
    openPersonDetails(person: any) {
        this.dataService.selectedPerson = person;
        this.navCtrl.navigateForward(['/details']);
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