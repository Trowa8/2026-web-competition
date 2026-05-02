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
            { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
        ],
    },
    {
        path: 'auth',
        loadComponent: () => import('./layout/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: [
            {
                path: 'login',
                loadChildren: () => import('./pages/login/login').then(m => m.LoginComponent),
            },
            {
                path: 'register',
                loadChildren: () => import('./pages/register/register').then(m => m.RegisterComponent),
            }
        ],
    },

    { path: '**', redirectTo: '/tournaments' },
];