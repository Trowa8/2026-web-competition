import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { TournamentList } from './pages/tournament-list/tournament-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tournaments', component: TournamentList },
];
