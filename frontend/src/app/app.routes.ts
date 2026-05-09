import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'review-solution',
        loadComponent: () => import('./pages/review-solution/review-solution').then(m => m.ReviewSolution)
    },
    {
        path: '',
        redirectTo: '/review-solution',
        pathMatch: 'full'
    }
];