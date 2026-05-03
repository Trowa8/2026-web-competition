import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Tournament } from '../types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {

  private tournamentsSignal = signal<Tournament[]>([]);
  public tournaments = this.tournamentsSignal.asReadonly();

  public isLoading = signal(false);

  constructor(private http: HttpClient) { }

  public async getTournaments(): Promise<Tournament[]> {
    this.isLoading.set(true);
    try {
      const data = await firstValueFrom(this.http.get<Tournament[]>('/api/tournaments'));
      this.tournamentsSignal.set(data || []);
      return data || [];
    } catch (err) {
      console.error('Помилка завантаження турнірів', err);
      this.tournamentsSignal.set([]);
      return [];
    } finally {
      this.isLoading.set(false);
    }
  }
}