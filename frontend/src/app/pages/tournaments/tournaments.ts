import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';
import { Tournament } from '../../shared/types/tournament.types';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournaments.html',
  styleUrls: ['./tournaments.css'],
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  isLoading = true;
  protected readonly Math = Math;

  constructor(private tournamentService: TournamentService) {}

  async ngOnInit() {
    await this.loadTournaments();
  }

  async loadTournaments() {
    this.isLoading = true;
    this.tournaments = await this.tournamentService.getTournaments();
    this.isLoading = false;
  }

  async joinTournament(id: number) {
    const result = await this.tournamentService.joinTournament(id);
    alert(result.message);
    await this.loadTournaments();
  }

  async leaveTournament(id: number) {
    const result = await this.tournamentService.leaveTournament(id);
    alert(result.message);
    await this.loadTournaments();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'status-upcoming';
      case 'ongoing':
        return 'status-ongoing';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'upcoming':
        return '🟢 Скоро';
      case 'ongoing':
        return '🟡 В процесі';
      case 'completed':
        return '🔵 Завершено';
      default:
        return status;
    }
  }
}
