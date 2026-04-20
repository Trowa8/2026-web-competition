import { Component, inject, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';

@Component({
    selector: 'app-create-tournament-dialog',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="dialog-overlay" (click)="onClose()">
            <div class="dialog-content" (click)="$event.stopPropagation()">
                <h2>Створити турнір</h2>
                
                <input 
                    [(ngModel)]="name" 
                    placeholder="Назва турніру" 
                    class="full-width"
                />
                
                <input 
                    [(ngModel)]="location" 
                    placeholder="Місце проведення" 
                    class="full-width"
                />
                
                <input 
                    [(ngModel)]="gameType" 
                    placeholder="Тип гри" 
                    class="full-width"
                />
                
                <input 
                    type="number" 
                    [(ngModel)]="maxPlayers" 
                    placeholder="Максимум учасників"
                    class="full-width"
                />
                
                <div class="buttons">
                    <button (click)="onClose()">Скасувати</button>
                    <button (click)="onSubmit()" [disabled]="!name">
                        Створити
                    </button>
                </div>
                
                @if (error()) {
                    <div class="error">{{ error() }}</div>
                }
            </div>
        </div>
    `,
    styles: [`
        .dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .dialog-content {
            background: white;
            padding: 24px;
            border-radius: 8px;
            width: 400px;
            max-width: 90%;
        }
        h2 {
            margin: 0 0 16px 0;
        }
        .full-width {
            width: 100%;
            padding: 8px;
            margin-bottom: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .buttons {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            margin-top: 16px;
        }
        button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:first-child {
            background: #6c757d;
            color: white;
        }
        button:last-child {
            background: #28a745;
            color: white;
        }
        button:last-child:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .error {
            margin-top: 12px;
            padding: 8px;
            background: #f8d7da;
            color: #721c24;
            border-radius: 4px;
        }
    `]
})
export class CreateTournamentDialogComponent {
    private tournamentService = inject(TournamentService);

    public close = output<void>();

    public name = '';
    public location = '';
    public gameType = '';
    public maxPlayers = 16;
    public error = signal<string>('');

    public async onSubmit(): Promise<void> {
        if (!this.name) {
            this.error.set('Введіть назву турніру');
            return;
        }

        const tournament = {
            name: this.name,
            location: this.location || 'Не вказано',
            gameType: this.gameType || 'Не вказано',
            maxPlayers: this.maxPlayers,
            description: '',
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            prizePool: 0
        };

        try {
            await this.tournamentService.createTournament(tournament);
            this.close.emit();
            alert(`Турнір "${this.name}" створено!`);
        } catch (err) {
            this.error.set('Помилка при створенні турніру');
        }
    }

    public onClose(): void {
        this.close.emit();
    }
    const dialog = document.querySelector('app-create-tournament-dialog');
    if(dialog) dialog.remove();
}
}