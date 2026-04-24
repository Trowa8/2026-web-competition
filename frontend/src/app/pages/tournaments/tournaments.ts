import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TournamentService } from '../../shared/services/tournament';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="tournaments-page">
      <h1>Турніри</h1>

      @if (showCreateForm()) {
        <div class="create-form">
          <h3>Новий турнір</h3>
          <input type="text" [(ngModel)]="newTournamentName" placeholder="Назва турніру" />
          <div class="form-buttons">
            <button (click)="cancelCreate()">Скасувати</button>
            <button (click)="createTournament()">Створити</button>
          </div>
        </div>
      }

      <div class="controls">
        <input type="text" [value]="searchTerm()" (input)="onSearch($any($event.target).value)" placeholder="Пошук..." />
        <button class="btn-create" (click)="showCreateForm.set(true)">+ Створити турнір</button>
      </div>

      @if (isLoading()) {
        <div class="loading">Завантаження...</div>
      } @else {
        <table class="table">
          <thead><tr><th>Назва</th><th>Статус</th><th>Команди</th><th>Дії</th></tr></thead>
          <tbody>
            @for (t of filteredTournaments(); track t.id) {
              <tr>
                <td>{{ t.name }}</td>
                <td><span class="status">{{ getStatusText(t.status) }}</span></td>
                <td>{{ t.registeredTeams }}/{{ t.maxTeams }}</td>
                <td><button class="delete" (click)="deleteTournament(t.id)">Видалити</button></td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
  styles: [`
    .tournaments-page { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 32px; margin-bottom: 24px; }
    .create-form { background: white; padding: 24px; border-radius: 16px; margin-bottom: 24px; }
    .create-form input { width: 100%; padding: 12px; margin-bottom: 16px; border: 2px solid #e0e0e0; border-radius: 12px; }
    .form-buttons { display: flex; gap: 12px; justify-content: flex-end; }
    .form-buttons button { padding: 8px 16px; border-radius: 8px; cursor: pointer; }
    .form-buttons button:first-child { background: #6c757d; color: white; }
    .form-buttons button:last-child { background: #28a745; color: white; }
    .controls { display: flex; gap: 16px; margin-bottom: 24px; }
    input { flex: 1; padding: 12px; border: 2px solid #e0e0e0; border-radius: 12px; }
    .btn-create { padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 12px; cursor: pointer; }
    .table { width: 100%; background: white; border-radius: 16px; overflow: hidden; border-collapse: collapse; }
    th, td { padding: 16px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
    .status-registration { background: #d4edda; color: #155724; }
    .status-ongoing { background: #d1ecf1; color: #0c5460; }
    .status-completed { background: #e2e3e5; color: #383d41; }
    .delete { padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 8px; cursor: pointer; }
    .loading { text-align: center; padding: 60px; color: #999; }
  `]
})
export class TournamentsComponent implements OnInit {
  private tournamentService = inject(TournamentService);

  public searchTerm = signal('');
  public showCreateForm = signal(false);
  public newTournamentName = '';

  public tournaments = this.tournamentService.tournaments;
  public isLoading = this.tournamentService.isLoading;

  public filteredTournaments = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return search ? this.tournaments().filter(t => t.name.toLowerCase().includes(search)) : this.tournaments();
  });

  async ngOnInit() {
    await this.tournamentService.getAllTournaments();
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }

  cancelCreate() {
    this.showCreateForm.set(false);
    this.newTournamentName = '';
  }

  async createTournament() {
    if (!this.newTournamentName.trim()) {
      alert('Введіть назву турніру');
      return;
    }

    await this.tournamentService.createTournament({
      name: this.newTournamentName,
      description: '',
      startDate: new Date().toISOString(),
      registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      maxTeams: 16,
    });

    this.cancelCreate();
    alert(`Турнір "${this.newTournamentName}" створено!`);
  }

  async deleteTournament(id: number) {
    if (confirm('Ви впевнені?')) {
      await this.tournamentService.deleteTournament(id);
      alert('Турнір видалено');
    }
  }

  getStatusText(status: string): string {
    const map: Record<string, string> = {
      draft: 'Чернетка',
      registration: 'Реєстрація',
      ongoing: 'Триває',
      completed: 'Завершено',
      cancelled: 'Скасовано',
    };
    return map[status] || status;
  }
}