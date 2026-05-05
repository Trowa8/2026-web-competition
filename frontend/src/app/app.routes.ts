import { Routes } from '@angular/router';
import { TournamentPage } from './pages/tournament/tournament.page';

export const routes: Routes = [
    { path: 'tournament', component: TournamentPage },
    { path: '', redirectTo: '/tournament', pathMatch: 'full' }
];