import { Routes } from '@angular/router';
import { TeamProfilePage } from './pages/team-profile/team-profile.page';

export const routes: Routes = [
    { path: '', redirectTo: '/team-profile', pathMatch: 'full' },
    { path: 'team-profile', component: TeamProfilePage }
];