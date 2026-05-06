import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCard } from './components/tournament-card/tournament-card';
import { RoleFilter } from './components/role-filter/role-filter';

export interface Tournament {
  id: number;
  name: string;
  date: string;
  teamsCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [CommonModule, TournamentCard, RoleFilter],
  templateUrl: './tournament-list.page.html',
  styleUrls: ['./tournament-list.page.css']
})
export class TournamentListPage {
  tournaments: Tournament[] = [
    { id: 1, name: 'Code-Arena 2025', date: 'Mon, Aug 17', teamsCount: 24, status: 'upcoming' },
    { id: 2, name: 'Summer Challenge', date: 'Fri, Sep 04', teamsCount: 16, status: 'upcoming' },
    { id: 3, name: 'Winter Cup', date: 'Sat, Dec 12', teamsCount: 32, status: 'upcoming' },
    { id: 4, name: 'Spring Masters', date: 'Wed, Mar 20', teamsCount: 20, status: 'completed' },
    { id: 5, name: 'Autumn Classic', date: 'Mon, Oct 10', teamsCount: 18, status: 'ongoing' },
    { id: 6, name: 'Junior Tournament', date: 'Tue, Jul 07', teamsCount: 12, status: 'completed' }
  ];

  filteredTournaments: Tournament[] = this.tournaments;
  selectedRole: string = 'all';

  onRoleSelected(role: string) {
    this.selectedRole = role;
    this.filteredTournaments = this.tournaments;
  }

  onSignUp(tournamentId: number) {
    alert('You signed up for tournament #' + tournamentId);
  }
}