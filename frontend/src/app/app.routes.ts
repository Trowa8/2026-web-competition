import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tournaments', component: TournamentsComponent },
    { path: 'create-tournament', component: CreateTournamentComponent },
    { path: '**', redirectTo: '/home' }
];