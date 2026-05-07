import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

type Tournament = { id: number; name: string; status: string; maxTeams: number; registeredTeams: number };

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private http = inject(HttpClient);
  private tournamentsState = signal<Tournament[]>([]);
  private loadingState = signal(false);

  tournaments = this.tournamentsState.asReadonly();
  isLoading = this.loadingState.asReadonly();

  async getAllTournaments(): Promise<Tournament[]> {
    this.loadingState.set(true);
    try {
      const data = await firstValueFrom<Tournament[]>(this.http.get<Tournament[]>(`${environment.apiUrl}/tournaments`));
      this.tournamentsState.set(data);
      return data;
    } finally {
      this.loadingState.set(false);
    }
  }
}