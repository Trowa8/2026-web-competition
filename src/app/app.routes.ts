import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { TournamentListComponent } from './pages/tournaments/tournament-list.component';
import { TeamListComponent } from './pages/teams/team-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'tournaments', component: TournamentListComponent },
      { path: 'teams', component: TeamListComponent },
      { path: '', redirectTo: 'tournaments', pathMatch: 'full' }
    ]
  }
];