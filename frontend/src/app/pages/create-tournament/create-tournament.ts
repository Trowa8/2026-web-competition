import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Team = {
  id: number;
  name: string;
  points: number;
  wins: number;
  losses: number;
};

type LeaderboardTeam = {
  name: string;
  points: number;
  wins: number;
  losses: number;
};

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-tournament.html',
  styleUrls: ['./create-tournament.css']
})
export class CreateTournament {
  tournamentName = '';
  description = '';
  startDate = '';
  endDate = '';
  numberOfTeams = 8;
  prizePool = '';
  format = 'single';

  teams: Team[] = [];
  newTeamName = '';
  showAddTeamForm = false;

  leaderboardTeams: LeaderboardTeam[] = [
    { name: 'Alpha Team', points: 67, wins: 8, losses: 2 },
    { name: 'Beta Squad', points: 42, wins: 5, losses: 5 },
    { name: 'Gamma Force', points: 32, wins: 4, losses: 6 },
    { name: 'Delta Unit', points: 28, wins: 3, losses: 7 }
  ];

  suggestedTeams = [
    { id: 1, name: 'SuperUltraSuper Team' },
    { id: 2, name: 'BestTeam' },
    { id: 3, name: 'KareyD3000 Team' }
  ];

  addTeam() {
    if (!this.newTeamName.trim()) return;
    this.teams.push({
      id: Date.now(),
      name: this.newTeamName,
      points: 0,
      wins: 0,
      losses: 0
    });
    this.newTeamName = '';
    this.showAddTeamForm = false;
  }

  addSuggestedTeam(team: { id: number; name: string }) {
    if (!this.teams.find(t => t.id === team.id)) {
      this.teams.push({
        id: team.id,
        name: team.name,
        points: 0,
        wins: 0,
        losses: 0
      });
      this.suggestedTeams = this.suggestedTeams.filter(t => t.id !== team.id);
    }
  }

  removeTeam(id: number) {
    const removed = this.teams.find(t => t.id === id);
    this.teams = this.teams.filter(t => t.id !== id);
    if (removed) {
      this.suggestedTeams.push({ id: removed.id, name: removed.name });
    }
  }

  createTournament() {
    if (!this.tournamentName.trim()) {
      alert('Введіть назву турніру');
      return;
    }
    if (!this.startDate || !this.endDate) {
      alert('Виберіть дати турніру');
      return;
    }
    if (this.teams.length < 2) {
      alert('Додайте хоча б 2 команди');
      return;
    }
    alert(`✅ Турнір "${this.tournamentName}" створено з ${this.teams.length} командами!`);
  }

  viewAllTeams() {
    alert('🏆 Всі команди лідерборду\n\n' + this.leaderboardTeams.map(t => `${t.name}: ${t.points} pts (${t.wins}-${t.losses})`).join('\n'));
  }
}