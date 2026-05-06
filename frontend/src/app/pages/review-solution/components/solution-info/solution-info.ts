import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solution } from '../../review-solution.page';

@Component({
  selector: 'app-solution-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="solution-info-card">
      <div class="card-header">
        <h2>Solution #{{ solution.id }}</h2>
        <span class="badge" [class]="solution.status">
          {{ solution.status }}
        </span>
      </div>
      <div class="card-body">
        <div class="info-row">
          <span class="label">Task:</span>
          <span class="value">{{ solution.taskName }}</span>
        </div>
        <div class="info-row">
          <span class="label">Team:</span>
          <span class="value">{{ solution.teamName }}</span>
        </div>
        <div class="info-row">
          <span class="label">Submitted:</span>
          <span class="value">{{ solution.submittedAt | date:'medium' }}</span>
        </div>
        <div class="info-row" *ngIf="solution.score">
          <span class="label">Current Score:</span>
          <span class="value score">{{ solution.score }}/100</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .solution-info-card {
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
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          
          &.pending {
            background: #f59e0b;
            color: white;
          }
          
          &.reviewing {
            background: #3b82f6;
            color: white;
          }
          
          &.scored {
            background: #10b981;
            color: white;
          }
        }
      }
      
      .card-body {
        padding: 1.5rem;
        
        .info-row {
          display: flex;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e2e8f0;
          
          .label {
            width: 100px;
            font-weight: 600;
            color: #4a5568;
          }
          
          .value {
            flex: 1;
            color: #333;
            
            &.score {
              color: #10b981;
              font-weight: bold;
              font-size: 1.1rem;
            }
          }
        }
      }
    }
  `]
})
export class SolutionInfo {
  @Input() solution!: Solution;
}