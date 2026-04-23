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

  public tournaments = computed(() => this.tournamentService.tournaments());

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
    await this.tournamentService.getTournaments();
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
        maxPlayers: Number(this.newTournament.maxPlayers),
        prizePool: Number(this.newTournament.prizePool),
        startDate: this.newTournament.startDate ? new Date(this.newTournament.startDate) : new Date(),
        endDate: this.newTournament.endDate ? new Date(this.newTournament.endDate) : new Date(),
        description: this.newTournament.description
      };

      await this.tournamentService.createTournament(tournamentData);
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
      alert('🗑️ Турнір видалено');
    }
  }
}