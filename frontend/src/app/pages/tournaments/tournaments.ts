import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { TournamentService } from '../../shared/services/tournament.service';

@Component({
    selector: 'app-tournaments',
    standalone: true,
    template: `
    <div class="container">
      <h1>Турніри</h1>
      
      @if (error()) {
        <div class="error">{{ error() }}</div>
      }
      
      <div class="controls">
        <input 
          type="text" 
          [value]="searchTerm()" 
          (input)="searchTerm.set($any($event.target).value)" 
          placeholder="Пошук турнірів..." 
        />
        <button (click)="createDemoTournament()" [disabled]="isLoading()">+ Створити тестовий турнір</button>
      </div>

      @if (isLoading()) {
        <div class="loading">Завантаження...</div>
      } @else {
        <table>
          <thead>
            <tr>
              <th>Назва</th>
              <th>Статус</th>
              <th>Команди</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            @for (t of filteredTournaments(); track t.id) {
              <tr>
                <td>{{ t.name }}</td>
                <td><span class="status">{{ getStatusText(t.status) }}</span></td>
                <td>{{ t.registeredTeams }}/{{ t.maxTeams }}</td>
                <td><button (click)="deleteTournament(t.id)">Видалити</button></td>
              </tr>
            } @empty {
              <tr><td colspan="4">Немає турнірів</td></tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
    styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { margin-bottom: 24px; }
    .controls { display: flex; gap: 16px; margin-bottom: 24px; }
    input { flex: 1; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; }
    button { padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; }
    button:disabled { opacity: 0.6; }
    table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; }
    th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; background: #d4edda; color: #155724; }
    .loading, .error { text-align: center; padding: 40px; color: #999; }
    .error { color: #c33; background: #fee; border-radius: 8px; }
  `]
})
export class Tournaments implements OnInit {
    private tournamentService = inject(TournamentService);

    searchTerm = signal('');
    tournaments = this.tournamentService.tournaments;
    isLoading = this.tournamentService.isLoading;
    error = this.tournamentService.error;

    filteredTournaments = computed(() => {
        const search = this.searchTerm().toLowerCase();
        return search ? this.tournaments().filter(t => t.name.toLowerCase().includes(search)) : this.tournaments();
    });

    async ngOnInit() {
        await this.tournamentService.getAllTournaments();
    }

    getStatusText(status: string): string {
        const map: Record<string, string> = {
            draft: 'Чернетка', registration: 'Реєстрація', ongoing: 'Триває',
            completed: 'Завершено', cancelled: 'Скасовано',
        };
        return map[status] || status;
    }

    async createDemoTournament() {
        const newTournament = {
            name: `Тестовий турнір ${new Date().toLocaleTimeString()}`,
            description: 'Опис тестового турніру',
            startDate: new Date().toISOString(),
            registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            maxTeams: 16,
        };
        await this.tournamentService.createTournament(newTournament);
    }

    async deleteTournament(id: number) {
        if (confirm('Видалити турнір?')) {
            await this.tournamentService.deleteTournament(id);
        }
    }
}