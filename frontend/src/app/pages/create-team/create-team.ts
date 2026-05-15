import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../../shared/services/team.service';
import { CreateTeamRequest } from '../../shared/types/team.type';
import { finalize, timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TeamCreate } from '../../shared/types/team.types';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-team.html',
  styleUrls: ['./create-team.css']
})
export class CreateTeamComponent {
  private teamService = inject(TeamService);
  private router = inject(Router);

  teamData: CreateTeamRequest = {
    name: '',
    description: ''
  };

  isLoading = false;

  onCreateTeam(): void {
    if (!this.teamData.name.trim()) return;

    this.isLoading = true;

    this.teamService.createTeam(this.teamData)
      .pipe(
        timeout(7000),
        finalize(() => this.isLoading = false),
        catchError(err => {
          const msg = err.name === 'TimeoutError' ? 'Сервер спить. Спробуйте пізніше.' : 'Помилка мережі.';
          alert(msg);
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (newTeam) => {
          this.router.navigate(['/team-profile'], { queryParams: { id: newTeam.teamId } });
        },
        error: (err) => {
          console.error('Error detail:', err);
        }
      });
  }
}