import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Team } from '../../create-tournament';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teams-list.html',
  styleUrls: ['./teams-list.css']
})
export class TeamsList {
  @Input() teams: Team[] = [];
  @Output() teamRemoved = new EventEmitter<number>();
  @Output() teamAdded = new EventEmitter<Team>();

  newTeamName = '';

  addTeam() {
    if (this.newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now(),
        name: this.newTeamName.trim(),
        points: 0,
        wins: 0,
        losses: 0
      };
      this.teamAdded.emit(newTeam);
      this.newTeamName = '';
    }
  }

  removeTeam(id: number) {
    this.teamRemoved.emit(id);
  }

  suggestedTeams = [
    { id: 100, name: 'SuperUltraSuper Team' },
    { id: 101, name: 'BestTeam' },
    { id: 102, name: 'KareyD3000 Team' }
  ];

  addSuggestedTeam(team: any) {
    const newTeam: Team = {
      id: team.id,
      name: team.name,
      points: 0,
      wins: 0,
      losses: 0
    };
    if (!this.teams.find(t => t.id === newTeam.id)) {
      this.teamAdded.emit(newTeam);
    }
  }
}