import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'review-solution',
        loadComponent: () => import('./pages/review-solution/review-solution').then(m => m.ReviewSolutionComponent)
    },
    {
        path: '',
        redirectTo: '/review-solution',
        pathMatch: 'full'
    }
];