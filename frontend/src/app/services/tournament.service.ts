import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  constructor(private http: HttpClient) {}

  async getTournaments(): Promise<any[]> {
    try {
      const data = await firstValueFrom(this.http.get<any>('http://localhost:8000/healthcheck'));
      return Array.isArray(data) ? data : this.getMockTournaments();
    } catch (err) {
      console.warn('Бекенд не відповідає, використовуємо тестові дані');
      return this.getMockTournaments();
    }
  }

  private getMockTournaments() {
    return [
      { id: 1, name: 'Чемпіонат України 2026' },
      { id: 2, name: 'Кубок України' },
      { id: 3, name: 'Ліга чемпіонів УЄФА' },
      { id: 4, name: 'Турнір Dnipro Cup' },
    ];
  }
}
