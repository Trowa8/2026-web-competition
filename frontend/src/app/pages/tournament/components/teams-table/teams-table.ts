import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="teams-card">
      <h2>Teams</h2>
      <table class="teams-table">
        <thead>
          <tr><th>#</th><th>Team Name</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let team of teams; let i = index">
            <td>{{ i + 1 }}</td>
            <td>{{ team }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .teams-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      padding: 1.5rem;
      
      h2 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.25rem;
      }
    }
    
    .teams-table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
      
      th {
        background: #f7fafc;
        font-weight: 600;
        color: #4a5568;
      }
    }
  `]
})
export class TeamsTable {
  teams: string[] = [
    'Alpha Team', 'Beta Squad', 'Gamma Force', 'Delta Unit',
    'Epsilon', 'Zeta', 'Eta', 'Theta'
  ];
}