import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'tournament',
        loadComponent: () => import('./pages/tournament-detail/tournament-detail').then(m => m.TournamentDetailComponent)
    },
    { path: '', redirectTo: '/tournament', pathMatch: 'full' },
    { path: '**', redirectTo: '/tournament' }
];