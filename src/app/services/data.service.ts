improt { Injectable } from '@angular/core';

//service used to pass data between pages
@Injectable({
    providedIn: 'root'
})
export class DataService {
    selectedMovie: any = null;
    selectedPerson: any = null;

    constructor() { }
}