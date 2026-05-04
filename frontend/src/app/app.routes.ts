import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/login/login';
import { authGuard } from './shared/core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'tournaments',
                loadComponent: () => import('./pages/tournaments/tournaments').then(m => m.Tournaments),
                canActivate: [authGuard],
            },
            { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
        ],
    },

    { path: '**', redirectTo: '/tournaments' },
    {
        path: 'team-profile',
        loadComponent: () =>
            import('./pages/team-profile/team-profile').then(m => m.TeamProfilePage),
    }
];