import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

// root component of the app, juts sets up the router outlet
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss',
    standalone: true,
    imports: [IonApp, IonRouterOutlet],
})

export class AppComponent {
    constructor() {}
}