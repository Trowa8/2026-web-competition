import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCard } from './components/tournament-card/tournament-card';
import { RoleFilter } from './components/role-filter/role-filter';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [CommonModule, TournamentCard, RoleFilter],
  templateUrl: './tournament-list.html',
  styleUrls: ['./tournament-list.css']
})
export class TournamentList {
  tournaments = [
    { id: 1, name: 'Code-Arena 2025', date: 'Mon, Aug 17', teams: 24 },
    { id: 2, name: 'Summer Challenge', date: 'Fri, Sep 04', teams: 16 },
    { id: 3, name: 'Winter Cup', date: 'Sat, Dec 12', teams: 32 },
    { id: 4, name: 'Spring Masters', date: 'Wed, Mar 20', teams: 20, completed: true },
    { id: 5, name: 'Autumn Classic', date: 'Mon, Oct 10', teams: 18 },
    { id: 6, name: 'Junior Tournament', date: 'Tue, Jul 07', teams: 12, completed: true }
  ];

  onSignUp(id: number) {
    alert('Signed up for tournament #' + id);
  }
}