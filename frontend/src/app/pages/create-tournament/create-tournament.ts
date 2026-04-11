import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 600px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 20px;">
      <h2>➕ Створити турнір</h2>
      
      <form (ngSubmit)="onSubmit()">
        <div style="margin-bottom: 1rem;">
          <label>Назва турніру:</label>
          <input type="text" [(ngModel)]="tournament.name" name="name" required style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>

        <div style="margin-bottom: 1rem;">
          <label>Гра:</label>
          <input type="text" [(ngModel)]="tournament.game" name="game" required style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>

        <div style="margin-bottom: 1rem;">
          <label>Опис:</label>
          <textarea [(ngModel)]="tournament.description" name="description" rows="3" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;"></textarea>
        </div>

        <div style="margin-bottom: 1rem;">
          <label>Максимум гравців:</label>
          <input type="number" [(ngModel)]="tournament.maxPlayers" name="maxPlayers" required style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>

        <div style="margin-bottom: 1rem;">
          <label>Призовий фонд ($):</label>
          <input type="number" [(ngModel)]="tournament.prizePool" name="prizePool" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button type="submit" style="flex: 1; padding: 0.75rem; background: #e94560; color: white; border: none; border-radius: 12px; cursor: pointer;">
            Створити
          </button>
          <button type="button" (click)="router.navigate(['/tournaments'])" style="flex: 1; padding: 0.75rem; background: #ccc; border: none; border-radius: 12px; cursor: pointer;">
            Скасувати
          </button>
        </div>
      </form>
    </div>
  `
})
export class CreateTournamentComponent {
  tournament = {
    name: '',
    game: '',
    description: '',
    maxPlayers: 16,
    prizePool: 0,
    startDate: new Date(),
    endDate: new Date(),
    currentPlayers: 0,
    status: 'upcoming' as const
  };

  constructor(
    private tournamentService: TournamentService,
    public router: Router
  ) { }

  async onSubmit() {
    if (!this.tournament.name || !this.tournament.game) {
      alert('Заповніть назву та гру!');
      return;
    }

    try {
      await this.tournamentService.createTournament(this.tournament);
      alert('✅ Турнір створено!');
      this.router.navigate(['/tournaments']);
    } catch (error) {
      alert('❌ Помилка створення');
    }
  }
}