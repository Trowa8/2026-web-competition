import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';

@Component({
    selector: 'app-tournament-list',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="tournament-page">
            <h1>Турніри</h1>
        
            @if (showForm()) {
                <div class="create-form">
                    <h3>Створити новий турнір</h3>
                    <input 
                        [(ngModel)]="newTournament.name" 
                        placeholder="Назва турніру *" 
                    />
                    <input 
                        [(ngModel)]="newTournament.location" 
                        placeholder="Місце проведення" 
                    />
                    <input 
                        [(ngModel)]="newTournament.gameType" 
                        placeholder="Тип гри" 
                    />
                    <input 
                        type="number" 
                        [(ngModel)]="newTournament.maxPlayers" 
                        placeholder="Макс. учасників" 
                    />
                    <div class="form-buttons">
                        <button (click)="hideForm()">Скасувати</button>
                        <button (click)="createTournament()" [disabled]="!newTournament.name">
                            Створити
                        </button>
                    </div>
                </div>
            }
            
            <div class="search-bar">
                <input 
                    type="text" 
                    [value]="searchTerm()"
                    (input)="onSearchInput($event)"
                    placeholder="Пошук..."
                />
                <button (click)="showForm.set(true)">Створити турнір</button>
            </div>

            <table class="tournament-table">
                <thead>
                    <tr>
                        <th>Назва турніру</th>
                        <th>Статус</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    @for (tournament of filteredTournaments(); track tournament.id) {
                        <tr>
                            <td>{{ tournament.name }}</td>
                            <td>
                                <span [class]="'status ' + tournament.status">
                                    {{ tournament.status === 'active' ? 'Активний' : 'Завершений' }}
                                </span>
                            </td>
                            <td>
                                <button class="delete-btn" (click)="deleteTournament(tournament.id)">
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    } @empty {
                        <tr>
                            <td colspan="3" class="no-data">
                                @if (tournaments().length === 0) {
                                    Завантаження...
                                } @else {
                                    Турніри не знайдено
                                }
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            <footer class="footer">
                <p>© 2026 Турнірна система</p>
            </footer>
        </div>
    `,
    styles: [`
        .tournament-page {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            min-height: calc(100vh - 200px);
        }
        h1 {
            margin-bottom: 20px;
            color: #333;
        }
        .create-form {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
        }
        .create-form h3 {
            margin: 0 0 15px 0;
        }
        .create-form input {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .form-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }
        .form-buttons button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .form-buttons button:first-child {
            background: #6c757d;
            color: white;
        }
        .form-buttons button:last-child {
            background: #28a745;
            color: white;
        }
        .form-buttons button:last-child:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .search-bar {
            display: flex;
            gap: 10px;
            margin: 20px 0;
        }
        .search-bar input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .search-bar button {
            padding: 10px 20px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .search-bar button:hover {
            background: #218838;
        }
        .tournament-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
        }
        .status.active {
            background: #d4edda;
            color: #155724;
        }
        .status.completed {
            background: #e2e3e5;
            color: #383d41;
        }
        .delete-btn {
            padding: 4px 12px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .delete-btn:hover {
            background: #c82333;
        }
        .no-data {
            text-align: center;
            padding: 40px;
            color: #999;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 4px;
        }
    `]
})
export class TournamentListComponent implements OnInit {
    private tournamentService = inject(TournamentService);

    public searchTerm = signal<string>('');
    public showForm = signal<boolean>(false);

    public newTournament = {
        name: '',
        location: '',
        gameType: '',
        maxPlayers: 16
    };

    public tournaments = computed(() => this.tournamentService.tournaments());

    public filteredTournaments = computed(() => {
        const search = this.searchTerm().toLowerCase();
        if (!search) return this.tournaments();

        return this.tournaments().filter(tournament =>
            tournament.name.toLowerCase().includes(search)
        );
    });

    async ngOnInit(): Promise<void> {
        await this.loadTournaments();
    }

    private async loadTournaments(): Promise<void> {
        await this.tournamentService.getTournaments();
    }

    public onSearchInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.searchTerm.set(input.value);
    }

    public hideForm(): void {
        this.showForm.set(false);
        this.resetForm();
    }

    private resetForm(): void {
        this.newTournament = {
            name: '',
            location: '',
            gameType: '',
            maxPlayers: 16
        };
    }

    public async createTournament(): Promise<void> {
        if (!this.newTournament.name) {
            alert('Введіть назву турніру');
            return;
        }

        try {
            await this.tournamentService.createTournament({
                name: this.newTournament.name,
                location: this.newTournament.location || 'Не вказано',
                gameType: this.newTournament.gameType || 'Не вказано',
                maxPlayers: this.newTournament.maxPlayers,
                description: '',
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                prizePool: 0
            });

            alert(`Турнір "${this.newTournament.name}" створено!`);
            this.hideForm();
        } catch (error) {
            alert('Помилка при створенні турніру');
        }
    }

    public async deleteTournament(id: number): Promise<void> {
        if (confirm('Ви впевнені, що хочете видалити цей турнір?')) {
            await this.tournamentService.deleteTournament(id);
            alert('Турнір видалено');
        }
    }
}