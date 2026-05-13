import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-detail.html',
  styleUrls: ['./tournament-detail.css']
})
export class TournamentDetailComponent {
  tournament = signal({
    tournament_id: 1,
    name: 'Kharkiv Open 2025',
    description: 'Your challenge for Kharkiv Open 2025. Show your best design skills!',
    start_date: '03.04.2025',
    registration_deadline: '01.04.2025',
    created_by: 10,
    created_at: '2025-01-01'
  });

  number_of_teams = signal(16);
  end_date = signal('10.04.2025');

  register() {
    console.log('Реєстрація на турнір активована');
  }
}