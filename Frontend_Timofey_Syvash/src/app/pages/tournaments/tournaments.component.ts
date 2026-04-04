import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';
import { AuthService } from '../../shared/services/auth.service';
import { Tournament } from '../../shared/types/tournament.interface';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private tournamentService: TournamentService
  ) {}

  async ngOnInit() {
    await this.loadTournaments();
  }

  async loadTournaments() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.tournaments = await this.tournamentService.getTournaments();
    } catch (error) {
      this.errorMessage = 'Помилка завантаження турнірів';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async joinTournament(id: number) {
    try {
      await this.tournamentService.joinTournament(id);
      alert('Ви приєдналися до турніру!');
      await this.loadTournaments();
    } catch (error) {
      alert('Помилка приєднання до турніру');
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'upcoming': return 'status-upcoming';
      case 'ongoing': return 'status-ongoing';
      case 'completed': return 'status-completed';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'upcoming': return 'Майбутній';
      case 'ongoing': return 'В процесі';
      case 'completed': return 'Завершений';
      default: return status;
    }
  }
}