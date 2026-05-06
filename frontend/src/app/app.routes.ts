import { Routes } from '@angular/router';
import { TournamentListPage } from './pages/tournament-list/tournament-list.page';

export const routes: Routes = [
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
    { path: 'tournaments', component: TournamentListPage }
];