import { Routes } from '@angular/router';
import { authGuard } from './shared/core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
        children: [
            {
                path: 'tournaments',
                loadComponent: () => import('./pages/tournaments/tournaments').then(m => m.Tournaments),
                canActivate: [authGuard],
            },
            {
                path: 'team-profile',
                loadComponent: () => import('./pages/team-profile/team-profile').then(m => m.TeamProfileComponent)
            },
        ],
    },
    {
        path: 'auth',
        loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
            }
        ],
    },

    { path: '**', redirectTo: '/auth/login' },
];
