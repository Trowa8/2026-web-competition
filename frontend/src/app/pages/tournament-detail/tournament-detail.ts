import { Component } from '@angular/core';

@Component({
    selector: 'app-tournament-detail',
    standalone: true,
    templateUrl: './tournament-detail.html',
    styleUrls: ['./tournament-detail.css'],
})
export class TournamentDetailComponent {
    tournament = {
        name: 'CS2 Cup 2024',
        status: 'registration',
        description: 'Міжнародний кіберспортивний турнір з CS2',
        startDate: '1 червня 2024',
        endDate: '10 червня 2024',
        location: 'Київ + Онлайн',
        gameType: 'CS2',
        teams: '8/16',
        prize: '50 000 ₴',
        organizer: 'CyberSport Ukraine',
    };

    getStatusText(): string {
        if (this.tournament.status === 'registration') return 'Реєстрація';
        if (this.tournament.status === 'ongoing') return 'Триває';
        if (this.tournament.status === 'completed') return 'Завершено';
        return this.tournament.status;
    }
}