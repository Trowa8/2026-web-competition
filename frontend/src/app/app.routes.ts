import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'team-profile',
        loadComponent: () => import('./pages/team-profile/team-profile').then(m => m.TeamProfile)
    },
    {
        path: '',
        redirectTo: '/team-profile',
        pathMatch: 'full'
    }
];