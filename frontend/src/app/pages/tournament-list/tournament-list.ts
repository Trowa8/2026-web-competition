import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../shared/types/tournament.types';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tournament-list.html',
  styleUrls: ['./tournament-list.css']
})
export class TournamentList implements OnInit {
  private tournamentService = inject(TournamentService);

  public searchTerm = signal<string>('');
  public showForm: boolean = false;
  public newTournament = {
    name: '',
    location: '',
    gameType: '',
    maxPlayers: 16,
    prizePool: 0,
    startDate: '',
    endDate: '',
    description: ''
  };

  public tournaments = signal<Tournament[]>([]);

  public filteredTournaments = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const items = this.tournaments();

    if (!search) return items;

    return items.filter((t: Tournament) =>
      t.name.toLowerCase().includes(search)
    );
  });

  async ngOnInit(): Promise<void> {
    await this.loadTournaments();
  }

  private async loadTournaments(): Promise<void> {
    const data = await this.tournamentService.getTournaments();
    this.tournaments.set(data);
  }

  public onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  public openForm(): void {
    this.showForm = true;
    document.body.style.overflow = 'hidden';
  }

  public closeForm(): void {
    this.showForm = false;
    document.body.style.overflow = '';
    this.resetForm();
  }

  private resetForm(): void {
    this.newTournament = {
      name: '',
      location: '',
      gameType: '',
      maxPlayers: 16,
      prizePool: 0,
      startDate: '',
      endDate: '',
      description: ''
    };
  }

  public async createTournament(): Promise<void> {
    if (!this.newTournament.name.trim()) {
      alert('Введіть назву турніру');
      return;
    }

    try {
      const tournamentData = {
        name: this.newTournament.name,
        location: this.newTournament.location,
        gameType: this.newTournament.gameType,
        maxPlayers: this.newTournament.maxPlayers,
        prizePool: this.newTournament.prizePool,
        startDate: this.newTournament.startDate ? new Date(this.newTournament.startDate) : undefined,
        endDate: this.newTournament.endDate ? new Date(this.newTournament.endDate) : undefined,
        description: this.newTournament.description
      };

      const created = await this.tournamentService.createTournament(tournamentData);
      const current = this.tournaments();
      this.tournaments.set([...current, created]);
      this.closeForm();
      alert(`✨ Турнір "${this.newTournament.name}" успішно створено!`);
    } catch (error) {
      console.error('Error:', error);
      alert('Помилка при створенні турніру');
    }
  }

  public async deleteTournament(id: number): Promise<void> {
    if (confirm('Ви впевнені, що хочете видалити цей турнір?')) {
      await this.tournamentService.deleteTournament(id);
      const current = this.tournaments();
      this.tournaments.set(current.filter(t => t.id !== id));
      alert('🗑️ Турнір видалено');
    }
  }
}