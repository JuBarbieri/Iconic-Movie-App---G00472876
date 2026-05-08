import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// service to handle saving and removing favourite movies. 
@Injectable({
    providedIn: 'root'
})
export class FavouritesService {

    constructor(private storage: Storage) {
        this.storage.create();
    }

    //get all saved favourites
    async getFavourites() {
        const favs = await this.storage.get('favourites');
        if (favs) {
            return favs;
        }
        return [];
    }

    //add a movie to favourites
    async addFavourite(movie: any) {
        const favs = await this.getFavourites();
         favs.push(movie);
        await this.storage.set('favourites', favs);
    }

    //remove a movie from favourites by id. 
    async removeFavourite(movieId: any) {
        let favs = await this.getFavourites();
        favs = favs.filter((m: any) => m.id != movieId);
       await this.storage.set('favourites', favs);
    }

    //check if a movie is already in favourites
    async isFavourite(movieId: any) {
       const favs= await this.getFavourites();
       return favs.some((m: any) => m.id == movieId);
    }
}