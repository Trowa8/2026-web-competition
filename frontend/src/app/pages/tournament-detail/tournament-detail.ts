import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';
import { TournamentType } from '../../shared/types/tournament.types';

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-detail.html',
  styleUrls: ['./tournament-detail.css']
})
export class TournamentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tournamentService = inject(TournamentService);

  tournament = signal<TournamentType | null>(null);
  numberOfTeams = signal(16);
  endDate = signal('10.04.2025');
  isLoading = signal(true);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '1'; // default to '1' if no id
    try {
      const tournamentData = await this.tournamentService.getTournamentById(id);
      this.tournament.set(tournamentData);
      this.endDate.set(tournamentData.end_date);
    } catch (error) {
      console.error('Error fetching tournament:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  register() {
    console.log('Реєстрація на турнір активована');
    // TODO: implement registration with service
  }
}