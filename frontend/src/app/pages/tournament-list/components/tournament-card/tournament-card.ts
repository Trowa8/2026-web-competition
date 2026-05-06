import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../tournament-list.page';

@Component({
  selector: 'app-tournament-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.completed]="tournament.status === 'completed'">
      <div class="card-header">
        <div class="icon">🏆</div>
        <div class="status" [class]="tournament.status">{{ tournament.status }}</div>
      </div>
      <div class="card-body">
        <h3>{{ tournament.name }}</h3>
        <div class="date">📅 {{ tournament.date }}</div>
        <div class="teams">👥 {{ tournament.teamsCount }} teams</div>
      </div>
      <div class="card-footer">
        <button (click)="signUp.emit(tournament.id)" [disabled]="tournament.status === 'completed'">
          {{ tournament.status === 'completed' ? 'Completed' : 'Sign up' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      overflow: hidden;
      transition: 0.2s;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      &.completed {
        opacity: 0.7;
      }
    }
    
    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      
      .icon {
        font-size: 2rem;
      }
      
      .status {
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.7rem;
        background: rgba(255,255,255,0.2);
        color: white;
        
        &.ongoing { background: #f59e0b; }
        &.completed { background: #10b981; }
        &.upcoming { background: #3b82f6; }
      }
    }
    
    .card-body {
      padding: 1rem;
      
      h3 {
        margin-bottom: 0.5rem;
      }
      
      .date, .teams {
        font-size: 0.875rem;
        color: #64748b;
        margin-bottom: 0.25rem;
      }
    }
    
    .card-footer {
      padding: 1rem;
      border-top: 1px solid #e2e8f0;
      
      button {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  `]
})
export class TournamentCard {
  @Input() tournament!: Tournament;
  @Output() signUp = new EventEmitter<number>();
}