import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'create-team',
        loadComponent: () => import('./pages/create-team/create-team').then(m => m.CreateTeam)
    },
    {
        path: '',
        redirectTo: '/create-team',
        pathMatch: 'full'
    }
];