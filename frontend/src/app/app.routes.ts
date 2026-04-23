import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { TournamentList } from './pages/tournament-list/tournament-list';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'tournaments', component: TournamentList, canActivate: [authGuard] },
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' }
];