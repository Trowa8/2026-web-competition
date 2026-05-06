import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-team-stats',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="stats-card">
      <div class="card-header">
        <h2>Participant Metrics</h2>
      </div>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{{ stats.totalParticipants }}</span>
          <span class="stat-label">Total Participants</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ stats.wins }}</span>
          <span class="stat-label">Wins</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ stats.rating }}</span>
          <span class="stat-label">Rating</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ stats.winRate }}%</span>
          <span class="stat-label">Win Rate</span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .stats-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      overflow: hidden;
      
      .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem 1.5rem;
        
        h2 {
          color: white;
          margin: 0;
          font-size: 1.25rem;
        }
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 1.5rem;
        gap: 1rem;
        text-align: center;
        
        .stat-item {
          .stat-value {
            display: block;
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
          }
          
          .stat-label {
            font-size: 0.7rem;
            color: #64748b;
          }
        }
      }
    }
  `]
})
export class TeamStats {
    @Input() stats: any;
}