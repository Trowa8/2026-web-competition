<<<<<<< HEAD
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  templateUrl: './tournament-detail.html',
  styleUrls: ['./tournament-detail.css'],
})
export class TournamentDetail {
  tournament = signal({
    id: 1,
    name: 'CS2 Cup 2024',
    status: 'registration',
    description: 'Міжнародний кіберспортивний турнір з CS2. Участь беруть 16 найкращих команд з усього світу. Призовий фонд – 50 000 грн.',
    startDate: '1 червня 2024',
    endDate: '10 червня 2024',
    registrationDeadline: '25 травня 2024',
    location: 'Київ, Україна + Онлайн',
    gameType: 'CS2',
    maxTeams: 16,
    registeredTeams: 8,
    prizePool: '50 000 ₴',
    organizer: 'CyberSport Ukraine',
    rules: 'Стандартні правила ESL. BO3 формат, фінал BO5.',
  });

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

  getStatusClass(status: string): string {
    return `status status-${status}`;
  }

  getProgressWidth(): number {
    return (this.tournament().registeredTeams / this.tournament().maxTeams) * 100;
  }
=======
import { Component } from '@angular/core';

@Component({
    selector: 'app-tournament-detail',
    standalone: true,
    templateUrl: './tournament-detail.html',
    styleUrls: ['./tournament-detail.css'],
})
export class TournamentDetail {
    tournament = {
        id: 1,
        name: 'CS2 Cup 2024',
        status: 'registration',
        description: 'Міжнародний кіберспортивний турнір з CS2. Участь беруть 16 найкращих команд.',
        startDate: '1 червня 2024',
        endDate: '10 червня 2024',
        registrationDeadline: '25 травня 2024',
        location: 'Київ, Україна + Онлайн',
        gameType: 'CS2',
        maxTeams: 16,
        registeredTeams: 8,
        prizePool: '50 000 ₴',
        organizer: 'CyberSport Ukraine',
    };

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

    getStatusClass(status: string): string {
        return `status status-${status}`;
    }

    getProgressWidth(): number {
        return (this.tournament.registeredTeams / this.tournament.maxTeams) * 100;
    }
>>>>>>> main
}