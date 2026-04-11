import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { TournamentsComponent } from './pages/tournaments/tournaments';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tournaments', component: TournamentsComponent },
    { path: '**', redirectTo: '/home' }
];