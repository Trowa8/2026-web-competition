import { Routes } from '@angular/router';
import { ReviewSolutionPage } from './pages/review-solution/review-solution.page';

export const routes: Routes = [
    { path: '', redirectTo: '/review-solution', pathMatch: 'full' },
    { path: 'review-solution', component: ReviewSolutionPage }
];