import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'tasks/review-solution/:id',
        loadComponent: () => import('./pages/review-solution/review-solution').then(m => m.ReviewSolutionComponent)
    },
    {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks/tasks').then(m => m.TasksComponent)
    },
    {
        path: 'tournaments',
        loadComponent: () => import('./pages/tournaments/tournaments').then(m => m.Tournaments)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
    },
    {
        path: 'user-profile',
        loadComponent: () => import('./pages/user-profile/user-profile').then(m => m.ProfileComponent)
    },
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: '**', redirectTo: 'tasks' }
];