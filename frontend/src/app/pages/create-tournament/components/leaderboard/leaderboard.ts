import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../create-tournament.page';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="leaderboard-card">
      <div class="card-header">
        <h2>🏆 Leaderboard</h2>
        <span class="badge">Top Teams</span>
      </div>
      <div class="card-body">
        <div class="leaderboard-header">
          <span class="rank">#</span>
          <span class="team">Team</span>
          <span class="points">Points</span>
          <span class="record">W/L</span>
        </div>
        
        <div *ngFor="let team of teams; let i = index" class="leaderboard-row" [class.top-three]="i < 3">
          <span class="rank">
            <span *ngIf="i === 0">🥇</span>
            <span *ngIf="i === 1">🥈</span>
            <span *ngIf="i === 2">🥉</span>
            <span *ngIf="i > 2">{{ i + 1 }}</span>
          </span>
          <span class="team">{{ team.name }}</span>
          <span class="points">{{ team.points }}</span>
          <span class="record">{{ team.wins }} - {{ team.losses }}</span>
        </div>
        
        <div class="leaderboard-footer">
          <button class="btn-view-all">View All Teams →</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .leaderboard-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      overflow: hidden;
      
      .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h2 {
          color: white;
          margin: 0;
          font-size: 1.25rem;
        }
        
        .badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.7rem;
          color: white;
        }
      }
      
      .card-body {
        padding: 1rem;
      }
      
      .leaderboard-header {
        display: grid;
        grid-template-columns: 50px 1fr 70px 80px;
        padding: 0.75rem;
        background: #f7fafc;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 0.5rem;
      }
      
      .leaderboard-row {
        display: grid;
        grid-template-columns: 50px 1fr 70px 80px;
        padding: 0.75rem;
        border-bottom: 1px solid #e2e8f0;
        align-items: center;
        
        &.top-three {
          background: #fef3c7;
          border-radius: 0.5rem;
          margin-bottom: 0.25rem;
        }
        
        .rank {
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .team {
          font-weight: 500;
          color: #333;
        }
        
        .points {
          font-weight: bold;
          color: #667eea;
        }
        
        .record {
          font-size: 0.75rem;
          color: #64748b;
        }
      }
      
      .leaderboard-footer {
        margin-top: 1rem;
        text-align: center;
        
        .btn-view-all {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          font-size: 0.875rem;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `]
})
export class Leaderboard {
  @Input() teams: Team[] = [];
}