import { Component, Input } from '@angular/core';
import { Tournament } from '../../../../shared/types/tournament.types';

@Component({
  selector: 'app-tournament-table',
  standalone: true,
  templateUrl: './tournament-table.html',
  styleUrls: ['./tournament-table.css'],
})
export class TournamentTable {
  @Input() tournament: Tournament[] = [];

  getStatusText(status: string): string {
    const map: Record<string, string> = {
      draft: 'Чернетка', registration: 'Реєстрація', ongoing: 'Триває',
      completed: 'Завершено', cancelled: 'Скасовано',
    };
    return map[status] || status;
  }
}