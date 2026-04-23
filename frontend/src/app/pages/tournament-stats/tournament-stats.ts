import { Component, inject, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';

@Component({
    selector: 'app-tournament-stats',
    standalone: true,
    template: `
        <div class="stats-container">
            <div class="stat-card">
                <h3>Всього турнірів</h3>
                <p class="stat-number">{{ stats().total }}</p>
            </div>
            <div class="stat-card">
                <h3>Активні</h3>
                <p class="stat-number">{{ stats().active }}</p>
            </div>
            <div class="stat-card">
                <h3>Завершені</h3>
                <p class="stat-number">{{ stats().completed }}</p>
            </div>
            <div class="stat-card">
                <h3>Учасників</h3>
                <p class="stat-number">{{ stats().totalParticipants }}</p>
            </div>
        </div>
    `,
    styles: [`
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .stat-card h3 {
            margin: 0 0 8px 0;
            color: #666;
            font-size: 14px;
        }
        .stat-number {
            margin: 0;
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `]
})
export class TournamentStats implements OnInit {
    private tournamentService = inject(TournamentService);
    public stats = this.tournamentService.stats;

    async ngOnInit(): Promise<void> {
        await this.tournamentService.getTournaments();
    }
}