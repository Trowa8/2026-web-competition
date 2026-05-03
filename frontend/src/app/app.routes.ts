import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/user-profile/user-profile').then(m => m.ProfileComponent),
    },
    {
        path: 'user-profile',
        loadComponent: () => import('./pages/user-profile/user-profile').then(m => m.ProfileComponent),
    },
    { path: '**', redirectTo: '' },
];
