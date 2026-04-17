import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { TournamentListComponent } from './pages/tournament-list/tournament-list';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tournaments', component: TournamentListComponent },
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' }
];