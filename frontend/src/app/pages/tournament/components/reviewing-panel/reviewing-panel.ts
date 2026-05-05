import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviewing-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reviewing-card">
      <h2>Judge Panel</h2>
      
      <div class="tasks-progress">
        <div *ngFor="let task of tasks" class="task-progress">
          <span>{{ task.name }}</span>
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="task.progress"></div>
          </div>
          <span>{{ task.progress }}%</span>
        </div>
      </div>
      
      <div class="filter-buttons">
        <button class="active">All</button>
        <button>Unscored</button>
        <button>Scored</button>
      </div>
      
      <div class="review-status">
        <div class="status-item">
          <span>To Review:</span>
          <strong>{{ reviewStatus.toReview }}</strong>
        </div>
        <div class="status-item">
          <span>Isolated:</span>
          <strong>{{ reviewStatus.isolated }}</strong>
        </div>
        <div class="status-item">
          <span>Winning Score:</span>
          <strong>{{ reviewStatus.winningScore }}</strong>
        </div>
      </div>
      
      <div class="solution-item">
        <span>Solution #2847</span>
        <span>Task 8</span>
        <span>😊</span>
      </div>
    </div>
  `,
  styles: [`
    .reviewing-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      padding: 1.5rem;
      
      h2 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.25rem;
      }
    }
    
    .tasks-progress {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .task-progress {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.875rem;
      
      .progress-bar {
        flex: 1;
        height: 8px;
        background: #e2e8f0;
        border-radius: 4px;
        overflow: hidden;
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 4px;
          transition: width 0.3s;
        }
      }
    }
    
    .filter-buttons {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      
      button {
        padding: 0.25rem 0.75rem;
        border: 1px solid #e2e8f0;
        background: white;
        border-radius: 0.375rem;
        cursor: pointer;
        
        &.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }
      }
    }
    
    .review-status {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: #f7fafc;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      
      .status-item {
        display: flex;
        gap: 0.5rem;
        font-size: 0.875rem;
      }
    }
    
    .solution-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: #edf2f7;
      border-radius: 0.5rem;
      font-weight: 500;
    }
  `]
})
export class ReviewingPanel {
  tasks = [
    { name: 'Task A', progress: 0 },
    { name: 'Task B', progress: 1 },
    { name: 'Task C', progress: 0 }
  ];

  reviewStatus = {
    toReview: 7,
    isolated: 24,
    winningScore: 7.8
  };
}