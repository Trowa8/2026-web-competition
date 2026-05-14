import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { TournamentSearch } from './components/tournament-search/tournament-search';
import { TournamentTable } from './components/tournament-table/tournament-table';
import { TournamentService } from '../../shared/services/tournament.service';
import { TournamentListItemType } from '../../shared/types/tournament.types';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [TournamentSearch, TournamentTable],
  templateUrl: './tournaments.html',
  styleUrls: ['./tournaments.css'],
})
export class Tournaments implements OnInit {
  private tournamentService = inject(TournamentService);

  searchTerm = signal('');
  tournaments = signal<TournamentListItemType[]>([]);
  isLoading = signal(false);

  filteredTournaments = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return search ? this.tournaments().filter(t => t.name.toLowerCase().includes(search)) : this.tournaments();
  });

  async ngOnInit() {
    this.isLoading.set(true);
    try {
      const items = await this.tournamentService.getAllTournaments();
      this.tournaments.set(items);
    } finally {
      this.isLoading.set(false);
    }
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }
}
