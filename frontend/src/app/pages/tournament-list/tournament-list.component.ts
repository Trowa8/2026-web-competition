@'
  import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tournament {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  prizePool?: number;
}

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
  tournaments: Tournament[] = [];

  ngOnInit(): void {
    this.tournaments = [
      {
        id: 1,
        name: '🏆 Чемпіонат Літа 2026',
        description: 'Найбільший турнір літнього сезону',
        startDate: new Date('2026-06-15'),
        endDate: new Date('2026-06-20'),
        location: 'Київ, Україна',
        maxParticipants: 64,
        currentParticipants: 45,
        status: 'upcoming',
        prizePool: 100000
      },
      {
        id: 2,
        name: '🎮 Кубок Зими 2026',
        description: 'Зимовий турнір з великим призовим фондом',
        startDate: new Date('2026-12-10'),
        endDate: new Date('2026-12-15'),
        location: 'Львів, Україна',
        maxParticipants: 32,
        currentParticipants: 28,
        status: 'upcoming',
        prizePool: 50000
      }
    ];
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      upcoming: 'СКОРО',
      ongoing: 'ТРИВАЄ',
      completed: 'ЗАВЕРШЕНО'
    };
    return statusMap[status] || status;
  }
}
'@ | Out-File -FilePath frontend/src/app/pages/tournament-list/tournament-list.component.ts -Encoding UTF8