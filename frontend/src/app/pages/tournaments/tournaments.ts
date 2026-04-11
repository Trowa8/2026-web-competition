import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../shared/services/tournament.service';
import { Tournament } from '../../shared/types/tournament.types';
import { MainLayout } from '../../layouts/main-layout/main-layout';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, MainLayout],
  templateUrl: './tournaments.html',
  styleUrls: ['./tournaments.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  isLoading = true;
  protected readonly Math = Math;

  constructor(private tournamentService: TournamentService) {
    console.log('TournamentsComponent created');
  }

  async ngOnInit() {
    console.log('Loading tournaments...');
    try {
      this.tournaments = await this.tournamentService.getTournaments();
      console.log('Tournaments loaded:', this.tournaments);
    } catch (error) {
      console.error('Error loading tournaments:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'upcoming': return 'status-upcoming';
      case 'ongoing': return 'status-ongoing';
      case 'completed': return 'status-completed';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'upcoming': return '🟢 Скоро';
      case 'ongoing': return '🟡 В процесі';
      case 'completed': return '🔵 Завершено';
      default: return status;
    }
  }

  async joinTournament(id: number) {
    console.log('Joining tournament:', id);
    await this.tournamentService.joinTournament(id);
    alert('✅ Ви приєдналися до турніру!');
  }
}