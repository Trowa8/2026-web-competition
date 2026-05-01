import { Routes } from '@angular/router';
<<<<<<< HEAD
import { TournamentList } from './pages/tournament-list/tournament-list';

export const routes: Routes = [
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
    { path: 'tournaments', component: TournamentList },
=======
import { TournamentListComponent } from './pages/tournament-list/tournament-list';

export const routes: Routes = [
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
    { path: 'tournaments', component: TournamentListComponent },
>>>>>>> 7e5c85abc519916356228fa3a4364425cd5d1b25
];