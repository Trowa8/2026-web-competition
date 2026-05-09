import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'create-tournament',
        loadComponent: () => import('./pages/create-tournament/create-tournament').then(m => m.CreateTournament)
    },
    {
        path: '',
        redirectTo: '/create-tournament',
        pathMatch: 'full'
    }
];