import { Routes } from '@angular/router';
import { authGuard } from './shared/core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent ) },
    { path: 'tournaments', loadComponent: () => import('./pages/tournaments/tournaments').then(m => m.TournamentsComponent ), canActivate: [authGuard] },
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
];