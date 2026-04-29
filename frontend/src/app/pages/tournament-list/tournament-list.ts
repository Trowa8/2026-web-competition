import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tournament-list.html',
  styleUrls: ['./tournament-list.css'],
})
export class TournamentList {
  searchText = signal('');

  tournaments = signal([
    { name: 'CS2 Cup 2024', status: 'registration', date: '1 червня 2024', teams: '8/16', prize: '50 000 ₴' },
    { name: 'Dota 2 League', status: 'ongoing', date: '15 травня 2024', teams: '16/16', prize: '25 000 ₴' },
    { name: 'Valorant Masters', status: 'completed', date: '1 квітня 2024', teams: '12/12', prize: '100 000 ₴' },
  ]);

  get filteredList() {
    const search = this.searchText().toLowerCase();
    return search ? this.tournaments().filter(t => t.name.toLowerCase().includes(search)) : this.tournaments();
  }

  getStatusClass(status: string) {
    return `status ${status}`;
  }

  getStatusText(status: string) {
    const map: any = { registration: 'Реєстрація', ongoing: 'Триває', completed: 'Завершено' };
    return map[status];
  }
}