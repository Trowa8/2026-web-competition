import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';
import { MainLayout } from '../../layouts/main-layout/main-layout';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MainLayout],
  templateUrl: './create-tournament.html',
  styleUrls: ['./create-tournament.css']
})
export class CreateTournamentComponent {
  tournament = {
    name: '',
    game: '',
    startDate: '',
    endDate: '',
    maxPlayers: 16,
    currentPlayers: 0,
    status: 'upcoming' as const,
    prizePool: 0,
    description: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private tournamentService: TournamentService,
    public router: Router  // Змінили private на public
  ) { }

  async onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.tournamentService.createTournament({
        ...this.tournament,
        startDate: new Date(this.tournament.startDate),
        endDate: new Date(this.tournament.endDate)
      });
      alert('✅ Турнір успішно створено!');
      this.router.navigate(['/tournaments']);
    } catch (error) {
      this.errorMessage = 'Помилка створення турніру';
    } finally {
      this.isLoading = false;
    }
  }
}