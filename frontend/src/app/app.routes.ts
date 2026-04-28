import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { TournamentsComponent } from './pages/tournaments/tournaments';
import { RegisterComponent } from './pages/register/register';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament';
import { AuthLayout } from './layout/auth-layout/auth-layout';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tournaments', component: TournamentsComponent },
      { path: 'create-tournament', component: CreateTournamentComponent },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/register', component: RegisterComponent },
    ],
  },

  { path: '**', redirectTo: '/home' },
];