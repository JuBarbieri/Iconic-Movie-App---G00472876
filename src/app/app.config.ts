import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http';

// app config - sets up routing, ionic and storage

export const appConfig: ApplicationConfig = {
    providers: [
       { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        provideRouter(routes),
        provideIonicAngular({}),
        provideHttpClient(),
        //ionic storage used to persist favourites
        importProvidersFrom(IonicStorageModule.forRoot()),
    ],
};