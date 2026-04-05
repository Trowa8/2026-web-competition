import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';

interface Tournament { id?: number; name?: string; status?: string; }

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Список турнірів</h2>
    <ul>
      <li *ngFor="let t of tournaments" style="padding:8px; border-bottom:1px solid #eee;">
        {{ t.name || t.status }}
      </li>
    </ul>
    <a routerLink="/teams" style="margin-top:20px; display:inline-block;">Перейти до команд →</a>
  `
})
export class TournamentListComponent implements OnInit {
  tournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentService) { }

  async ngOnInit() {
    this.tournaments = await this.tournamentService.getTournaments();
  }
}