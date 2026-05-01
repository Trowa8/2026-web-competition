import { Routes } from '@angular/router';
import { TournamentsComponent } from './pages/tournaments/tournaments';
import { UserProfile } from './pages/user-profile/user-profile';

export const routes: Routes = [
    { path: 'profile', component: UserProfile }
];