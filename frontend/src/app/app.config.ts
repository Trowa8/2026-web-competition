import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
<<<<<<< HEAD
import { authInterceptor } from './shared/core/interceptors/auth.interceptor';
=======
import { authInterceptor } from './shared/interceptors/auth.interceptor';
>>>>>>> 7e5c85abc519916356228fa3a4364425cd5d1b25

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
<<<<<<< HEAD
    provideHttpClient(withInterceptors([authInterceptor])),
=======
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
>>>>>>> 7e5c85abc519916356228fa3a4364425cd5d1b25
  ],
};