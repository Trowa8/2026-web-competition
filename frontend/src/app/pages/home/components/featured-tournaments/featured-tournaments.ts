import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tournament {
  id: number;
  name: string;
  date: string;
  teamsCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

@Component({
  selector: 'app-featured-tournaments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tournaments-card">
      <div class="card-header">
        <h2>{{ title }}</h2>
        <button class="btn-all" *ngIf="showViewAll" (click)="onViewAll()">All →</button>
      </div>
      <div class="tournaments-list">
        <div *ngFor="let tournament of tournaments" class="tournament-item">
          <div class="tournament-icon">🏆</div>
          <div class="tournament-info">
            <h3>{{ tournament.name }}</h3>
            <p>📅 {{ tournament.date }}</p>
            <p>👥 {{ tournament.teamsCount }} teams</p>
          </div>
          <button 
            class="btn-signup" 
            [class.completed]="tournament.status === 'completed'"
            (click)="onSignUp(tournament.id)">
            {{ tournament.status === 'completed' ? 'Completed' : 'Sign up' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tournaments-card {
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
        
        .btn-all {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          color: white;
          cursor: pointer;
          
          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
      
      .tournaments-list {
        padding: 1rem;
        
        .tournament-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          
          &:last-child {
            border-bottom: none;
          }
          
          .tournament-icon {
            font-size: 2rem;
          }
          
          .tournament-info {
            flex: 1;
            
            h3 {
              margin: 0 0 0.25rem;
              font-size: 1rem;
            }
            
            p {
              margin: 0;
              font-size: 0.75rem;
              color: #64748b;
            }
          }
          
          .btn-signup {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            
            &.completed {
              background: #64748b;
              cursor: default;
            }
          }
        }
      }
    }
  `]
})
export class FeaturedTournaments {
  @Input() tournaments: Tournament[] = [];
  @Input() title: string = 'Tournaments';
  @Input() showViewAll: boolean = true;
  @Output() signUp = new EventEmitter<number>();
  @Output() viewAll = new EventEmitter<void>();

  onSignUp(tournamentId: number) {
    this.signUp.emit(tournamentId);
  }

  onViewAll() {
    this.viewAll.emit();
  }
}