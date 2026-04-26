import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: 'login', component: Login },

    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'tournaments',
                loadComponent: () => import('./pages/tournaments/tournaments').then(m => m.Tournaments)
            },
            { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
        ],
    },

    { path: '**', redirectTo: '/tournaments' },
];