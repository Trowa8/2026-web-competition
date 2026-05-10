import { Routes } from '@angular/router';
import { TeamProfileComponent } from './pages/team-profile/team-profile';

export const routes: Routes = [
    {
        path: 'team-profile',
        component: TeamProfileComponent
    },
    {
        path: 'create-team',
        component: TeamProfileComponent
    },
    {
        path: '',
        redirectTo: 'team-profile',
        pathMatch: 'full'
    }
];