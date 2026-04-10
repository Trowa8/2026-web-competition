import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Команди</h1>

    <div class="grid">
      <div class="card" *ngFor="let team of teams">
        {{ team.name }}
      </div>
    </div>

    <button (click)="back()">← Назад</button>
  `,
  styles: [`
    h1 {
      margin-bottom: 20px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 20px;
    }

    .card {
      padding: 20px;
      background: #f5f5f5;
      border-radius: 10px;
      text-align: center;
      font-weight: bold;
      transition: 0.2s;
    }

    .card:hover {
      background: #e0e0e0;
      transform: scale(1.05);
    }

    button {
      margin-top: 30px;
      padding: 10px 20px;
    }
  `]
})
export class TeamListComponent {
  teams = [
    { id: 1, name: 'Team A' },
    { id: 2, name: 'Team B' },
    { id: 3, name: 'Team C' }
  ];

  constructor(private router: Router) { }

  back() {
    this.router.navigate(['/']);
  }
}