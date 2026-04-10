import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Турніри</h1>

    <ul>
      <li *ngFor="let t of tournaments">
        {{ t.name }}
      </li>
    </ul>
  `
})
export class TournamentListComponent {
  tournaments = [
    { id: 1, name: 'Dota 2 Cup' },
    { id: 2, name: 'CS2 League' }
  ];
}