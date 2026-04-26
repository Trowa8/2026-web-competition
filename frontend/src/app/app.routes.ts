import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
    { path: 'tournaments', loadComponent: () => import('./pages/tournaments/tournaments').then(m => m.Tournaments), canActivate: [authGuard] },
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
];