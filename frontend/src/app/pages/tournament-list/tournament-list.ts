import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  templateUrl: './tournament-list.html',
  styleUrls: ['./tournament-list.css'],
})
export class TournamentListComponent {
  searchTerm = signal('');

  tournaments = signal([
    { id: 1, name: 'CS2 Cup 2024', status: 'registration', startDate: '1 червня 2024', currentTeams: 8, maxTeams: 16, prizePool: '50 000 ₴' },
    { id: 2, name: 'Dota 2 League', status: 'ongoing', startDate: '15 травня 2024', currentTeams: 16, maxTeams: 16, prizePool: '25 000 ₴' },
    { id: 3, name: 'Valorant Masters', status: 'completed', startDate: '1 квітня 2024', currentTeams: 12, maxTeams: 12, prizePool: '100 000 ₴' },
    { id: 4, name: 'LoL Championship', status: 'registration', startDate: '10 червня 2024', currentTeams: 4, maxTeams: 8, prizePool: '75 000 ₴' },
  ]);

  filteredTournaments = () => {
    const search = this.searchTerm().toLowerCase();
    if (!search) return this.tournaments();
    return this.tournaments().filter(t => t.name.toLowerCase().includes(search));
  };

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
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

  getStatusClass(status: string): string {
    return `status status-${status}`;
  }

  getProgressWidth(current: number, max: number): number {
    return (current / max) * 100;
  }
}