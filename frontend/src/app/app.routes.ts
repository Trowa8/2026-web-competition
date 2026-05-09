import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'tournament', loadComponent: () => import('./pages/tournament/tournament').then(m => m.Tournament) },
    { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'tables', loadComponent: () => import('./pages/tables/tables').then(m => m.Tables) },
    { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile) },
    { path: 'search-info', loadComponent: () => import('./pages/search-info/search-info').then(m => m.SearchInfo) },
    { path: 'qa', loadComponent: () => import('./pages/qa/qa').then(m => m.Qa) },
    { path: '', redirectTo: '/tournament', pathMatch: 'full' }
];