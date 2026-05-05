import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tournament-info-card">
      <h2>Tournament Info</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Number of teams</span>
          <span class="value">16</span>
        </div>
        <div class="info-item">
          <span class="label">Start</span>
          <span class="value">03.04.2025</span>
        </div>
        <div class="info-item">
          <span class="label">End</span>
          <span class="value">10.04.2025</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tournament-info-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      padding: 1.5rem;
      
      h2 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.25rem;
      }
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e2e8f0;
      
      .label {
        color: #64748b;
        font-size: 0.875rem;
      }
      
      .value {
        font-weight: 600;
        color: #333;
      }
    }
  `]
})
export class TournamentInfo { }