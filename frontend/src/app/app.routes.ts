import { Routes } from '@angular/router';
import { CreateTournamentPage } from './pages/create-tournament/create-tournament.page';

export const routes: Routes = [
    { path: '', redirectTo: '/create-tournament', pathMatch: 'full' },
    { path: 'create-tournament', component: CreateTournamentPage }
];