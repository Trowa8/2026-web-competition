import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Tournament,
  CreateTournamentDto,
  UpdateTournamentDto,
  TournamentFilters,
} from '../types/tournament.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tournaments`;

  getAll(filters?: TournamentFilters) {
    return this.http.get<Tournament[]>(this.apiUrl, {
      params: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.search && { search: filters.search }),
      },
    });
  }

  getById(id: string) {
    return this.http.get<Tournament>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateTournamentDto) {
    return this.http.post<Tournament>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateTournamentDto) {
    return this.http.patch<Tournament>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}