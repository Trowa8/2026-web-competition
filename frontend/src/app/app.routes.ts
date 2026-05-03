import { Routes } from '@angular/router';
import { TournamentDetail } from './pages/tournament-detail/tournament-detail';

export const routes: Routes = [
    { path: '', redirectTo: '/tournament/1', pathMatch: 'full' },
    { path: 'tournament/:id', component: TournamentDetail },
];