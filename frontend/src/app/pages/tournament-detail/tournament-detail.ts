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

    getStatusClass() {
        return `status ${this.tournament.status}`;
    }

    getStatusText() {
        const map: any = { registration: 'Реєстрація', ongoing: 'Триває', completed: 'Завершено' };
        return map[this.tournament.status];
    }
}