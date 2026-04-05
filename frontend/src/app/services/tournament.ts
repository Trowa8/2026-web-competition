import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Tournament {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}/tournaments`);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/tournaments/${id}`);
  }
}
