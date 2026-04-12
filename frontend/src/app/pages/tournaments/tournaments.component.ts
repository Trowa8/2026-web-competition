import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';
import { Tournament } from '../../shared/types/tournament.types';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: WritableSignal<Tournament[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  protected readonly Math = Math;

  constructor(private tournamentService: TournamentService) { }

  async ngOnInit() {
    await this.loadTournaments();
  }

  async loadTournaments() {
    this.isLoading.set(true);
    const data = await this.tournamentService.getTournaments();
    this.tournaments.set(data);
    this.isLoading.set(false);
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
      case 'upcoming': return 'upcoming';
      case 'ongoing': return 'ongoing';
      case 'completed': return 'completed';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'upcoming': return '🟢 СКОРО';
      case 'ongoing': return '🟡 В ПРОЦЕСІ';
      case 'completed': return '🔵 ЗАВЕРШЕНО';
      default: return status;
    }
  }
}