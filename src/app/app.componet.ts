import { Component } from '@angular/core';
import { Ionapp, IonRouterOutlet } from '@ionic/angular/standalone';

// root component of the app, juts sets up the router outlet
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [Ionapp, IonRouterOutlet],
})

export class AppComponent {
    constructor() {}
}