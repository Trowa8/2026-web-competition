import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamService } from '../../services/team.service';

interface Team {
  id: number;
  name: string;
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Список команд</h2>
    <ul>
      <li *ngFor="let team of teams" style="padding:8px;">{{ team.name }}</li>
    </ul>
    <a routerLink="/tournaments">← Повернутися до турнірів</a>
  `,
})
export class TeamListComponent {
  teams: Team[] = [];

  constructor(private teamService: TeamService) {
    this.teams = this.teamService.getTeams();
  }
}
