import { Routes } from '@angular/router';
import { SubmitSolutionPage } from './pages/submit-solution/submit-solution.page';

export const routes: Routes = [
    { path: '', redirectTo: '/submit-solution', pathMatch: 'full' },
    { path: 'submit-solution', component: SubmitSolutionPage }
];