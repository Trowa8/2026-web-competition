import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { TournamentService } from '../../shared/services/tournament.service';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  templateUrl: './tournaments.html',
  styleUrls: ['./tournaments.css'],
})
export class Tournaments implements OnInit {
  private tournamentService = inject(TournamentService);

  searchTerm = signal('');
  tournaments = this.tournamentService.tournaments;
  isLoading = this.tournamentService.isLoading;

  filteredTournaments = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return search ? this.tournaments().filter(t => t.name.toLowerCase().includes(search)) : this.tournaments();
  });

  async ngOnInit() {
    await this.tournamentService.getAllTournaments();
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }
}