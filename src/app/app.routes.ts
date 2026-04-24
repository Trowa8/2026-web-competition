import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
    },
    {
        path: 'tournaments',
        loadComponent: () => import('./pages/tournaments/tournaments').then(m => m.TournamentsComponent),
    },
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
    { path: '**', redirectTo: '/tournaments' },
];