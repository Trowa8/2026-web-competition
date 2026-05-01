import { Routes } from '@angular/router';
import { TournamentListComponent } from './pages/tournament-list/tournament-list';

export const routes: Routes = [
<<<<<<< HEAD
    { path: '', component: TournamentListComponent },
=======
    { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
>>>>>>> main
    { path: 'tournaments', component: TournamentListComponent },
];