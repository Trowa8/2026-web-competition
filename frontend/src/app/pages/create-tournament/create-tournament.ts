import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';
import { CreateTournamentRequest } from '../../shared/types/tournament.types';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-tournament.html',
  styleUrls: ['./create-tournament.css']
})
export class CreateTournamentComponent {
  private tournamentService = inject(TournamentService);
  private router = inject(Router);

  tournamentData: CreateTournamentRequest = {
    name: '',
    description: '',
    startDate: '',
    location: '',
    maxTeams: 16
  };

  isLoading = false;

  onCreateTournament(): void {
    if (!this.tournamentData.name.trim()) return;

    this.isLoading = true;
    this.tournamentService.createTournament(this.tournamentData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => {
          console.log('Tournament created:', res);
          this.router.navigate(['/tournaments', res.id]);
        },
        error: () => alert('Не вдалося створити турнір')
      });
  }
}