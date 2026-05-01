import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tournament-list.html',
  styleUrls: ['./tournament-list.css'],
})
export class TournamentListComponent {
  searchTerm = signal('');

  // Демо-дані для відображення
  tournaments = signal([
    { id: 1, name: 'CS2 Cup 2024', status: 'registration', teams: '8/16', prize: '50 000 ₴', date: '1 червня 2024' },
    { id: 2, name: 'Dota 2 League', status: 'ongoing', teams: '16/16', prize: '25 000 ₴', date: '15 травня 2024' },
    { id: 3, name: 'Valorant Masters', status: 'completed', teams: '12/12', prize: '100 000 ₴', date: '1 квітня 2024' },
    { id: 4, name: 'LoL Championship', status: 'registration', teams: '4/8', prize: '75 000 ₴', date: '10 червня 2024' },
  ]);

  get filteredTournaments() {
    const search = this.searchTerm().toLowerCase();
    if (!search) return this.tournaments();
    return this.tournaments().filter(t => t.name.toLowerCase().includes(search));
  }

  getStatusText(status: string): string {
    const map: Record<string, string> = {
      registration: 'Реєстрація',
      ongoing: 'Триває',
      completed: 'Завершено',
      draft: 'Чернетка',
    };
    return map[status] || status;
  }

  getStatusClass(status: string): string {
    return `status ${status}`;
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }
}