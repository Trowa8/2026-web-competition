import { Routes } from '@angular/router';
import { TournamentListComponent } from './pages/tournament-list/tournament-list';

export const routes: Routes = [
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
    { path: 'tournaments', component: TournamentListComponent },
];