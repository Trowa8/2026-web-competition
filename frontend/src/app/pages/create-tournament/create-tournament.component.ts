import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 2rem;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; padding: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
        <h1 style="text-align: center; color: #1a1a2e; margin-bottom: 2rem;">➕ Створити турнір</h1>
        
        <form (ngSubmit)="onSubmit()">
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Назва турніру *</label>
            <input 
              type="text" 
              [(ngModel)]="tournament.name" 
              name="name"
              required
              class="form-control"
              placeholder="Cyber Cup 2024"
              style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 1rem;">
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Гра / Напрямок *</label>
            <input 
              type="text" 
              [(ngModel)]="tournament.game" 
              name="game"
              required
              class="form-control"
              placeholder="Веб-розробка, Python, AI..."
              style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 1rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Максимум учасників</label>
              <input 
                type="number" 
                [(ngModel)]="tournament.maxPlayers" 
                name="maxPlayers"
                class="form-control"
                style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 1rem;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Призовий фонд ($)</label>
              <input 
                type="number" 
                [(ngModel)]="tournament.prizePool" 
                name="prizePool"
                class="form-control"
                style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 1rem;">
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Опис</label>
            <textarea 
              [(ngModel)]="tournament.description" 
              name="description"
              rows="4"
              class="form-control"
              placeholder="Опис турніру..."
              style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 1rem; resize: vertical;"></textarea>
          </div>

          @if (errorMessage) {
            <div style="color: #e94560; margin-bottom: 1rem; text-align: center;">{{ errorMessage }}</div>
          }

          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button 
              type="button" 
              routerLink="/tournaments"
              style="flex: 1; padding: 0.75rem; background: #f0f0f0; color: #666; border: none; border-radius: 12px; font-size: 1rem; font-weight: 500; cursor: pointer;">
              Скасувати
            </button>
            <button 
              type="submit" 
              [disabled]="isLoading"
              style="flex: 1; padding: 0.75rem; background: linear-gradient(135deg, #e94560, #f5a623); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s;">
              {{ isLoading ? 'Створення...' : 'Створити турнір' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CreateTournamentComponent {
  tournament = {
    name: '',
    game: '',
    maxPlayers: 16,
    prizePool: 0,
    description: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private tournamentService: TournamentService,
    private router: Router
  ) { }

  async onSubmit() {
    if (!this.tournament.name || !this.tournament.game) {
      this.errorMessage = 'Будь ласка, заповніть назву та гру!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.tournamentService.createTournament({
        name: this.tournament.name,
        game: this.tournament.game,
        maxPlayers: this.tournament.maxPlayers,
        prizePool: this.tournament.prizePool,
        description: this.tournament.description,
        startDate: new Date(),
        endDate: new Date(),
        currentPlayers: 0,
        status: 'upcoming'
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