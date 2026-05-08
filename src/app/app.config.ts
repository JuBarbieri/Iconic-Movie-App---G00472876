import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';

// app config - sets up routing, ionic and storage

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideIonicAngular({}),
        //ionic storage used to persist favourites
        importProvidersFrom(IonicStorageModule.forRoot()),
    ],
};