import { Component, OnInit, inject, signal } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament.types';
import { CreateTournamentDialogComponent } from './create-tournament-dialog.component';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [CreateTournamentDialogComponent],
  template: `
        <div class="tournament-list">
            <h1>Список турнірів</h1>
            
            <button (click)="showCreateDialog.set(true)" class="create-btn">
                Створити турнір
            </button>
            
            @if (loading()) {
                <p>Завантаження... турнірів</p>
            } @else {
                <div class="tournaments">
                    @for (tournament of tournaments(); track tournament.id) {
                        <div class="tournament-card">
                            <h3>{{ tournament.name }}</h3>
                            <p>Статус: {{ tournament.status }}</p>
                            <button (click)="deleteTournament(tournament.id)" class="delete-btn">
                                Видалити
                            </button>
                        </div>
                    }
                </div>
            }
            
            @if (showCreateDialog()) {
                <app-create-tournament-dialog 
                    (close)="showCreateDialog.set(false)"
                />
            }
        </div>
    `,
  styles: [`
        .tournament-list {
            padding: 20px;
        }
        .create-btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        .tournaments {
            display: grid;
            gap: 16px;
        }
        .tournament-card {
            border: 1px solid #ddd;
            padding: 16px;
            border-radius: 8px;
            background: white;
        }
        .delete-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
        }
    `]
})
export class TournamentListComponent implements OnInit {
  private tournamentService = inject(TournamentService);

  public tournaments = signal<Tournament[]>([]);
  public loading = signal<boolean>(true);
  public showCreateDialog = signal<boolean>(false);

  ngOnInit(): void {
    this.loadTournaments();
  }

  private async loadTournaments(): Promise<void> {
    this.loading.set(true);
    try {
      const data = await this.tournamentService.getTournaments();
      this.tournaments.set(data);
    } catch (error) {
      console.error('Помилка завантаження турнірів:', error);
    } finally {
      this.loading.set(false);
    }
  }

  public async deleteTournament(id: number): Promise<void> {
    await this.tournamentService.deleteTournament(id);
    // Tournaments will update via signal
  }
}
