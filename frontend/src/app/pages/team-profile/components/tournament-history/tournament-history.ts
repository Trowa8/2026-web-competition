import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../team-profile.page';

@Component({
  selector: 'app-tournament-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-card">
      <div class="card-header">
        <h2>TOURNAMENT HISTORY</h2>
        <button class="btn-history" (click)="viewHistory.emit()">View history →</button>
      </div>
      <div class="tournament-list">
        <div *ngFor="let tournament of displayTournaments" class="tournament-item">
          <div class="tournament-info">
            <span class="tournament-name">{{ tournament.name }}</span>
            <span class="tournament-date">{{ tournament.date }}</span>
          </div>
          <div class="tournament-result">
            <span class="position">{{ getPositionEmoji(tournament.position) }} #{{ tournament.position }}</span>
            <span class="points">{{ tournament.points }} pts</span>
          </div>
        </div>
      </div>
      <div class="card-footer" *ngIf="tournaments.length > 3">
        <button class="btn-view-all" (click)="viewAll.emit()">All tournaments →</button>
      </div>
    </div>
  `,
  styles: [`
    .history-card {
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
          font-size: 1rem;
          letter-spacing: 1px;
        }
        
        .btn-history {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          color: white;
          cursor: pointer;
          font-size: 0.7rem;
          
          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
      
      .tournament-list {
        padding: 0.5rem;
        
        .tournament-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
          
          .tournament-info {
            .tournament-name {
              display: block;
              font-weight: 500;
              color: #333;
            }
            
            .tournament-date {
              font-size: 0.7rem;
              color: #64748b;
            }
          }
          
          .tournament-result {
            text-align: right;
            
            .position {
              display: block;
              font-weight: bold;
              font-size: 0.875rem;
            }
            
            .points {
              font-size: 0.7rem;
              color: #10b981;
            }
          }
        }
      }
      
      .card-footer {
        padding: 0.75rem;
        text-align: center;
        border-top: 1px solid #e2e8f0;
        
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
export class TournamentHistory {
  @Input() tournaments: Tournament[] = [];
  @Output() viewHistory = new EventEmitter<void>();
  @Output() viewAll = new EventEmitter<void>();

  get displayTournaments(): Tournament[] {
    return this.tournaments.slice(0, 3);
  }

  getPositionEmoji(position: number): string {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return '📊';
  }
}