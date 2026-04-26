import { Routes } from '@angular/router';
import { TournamentListComponent } from './pages/tournament-list/tournament-list';

export const routes: Routes = [
    { path: '', component: TournamentListComponent },
    { path: 'tournaments', component: TournamentListComponent },
];