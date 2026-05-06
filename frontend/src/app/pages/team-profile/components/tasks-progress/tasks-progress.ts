import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../team-profile.page';

@Component({
    selector: 'app-tasks-progress',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="tasks-card">
      <div class="card-header">
        <h2>My Tasks</h2>
        <button class="btn-all" (click)="viewAll.emit()">All →</button>
      </div>
      <div class="tasks-list">
        <div *ngFor="let task of displayTasks" class="task-item" [class.completed]="task.completed">
          <div class="task-checkbox">
            <span *ngIf="task.completed">✅</span>
            <span *ngIf="!task.completed">⭕</span>
          </div>
          <div class="task-info">
            <span class="task-name">{{ task.name }}</span>
            <span class="task-deadline" *ngIf="task.deadline">Due: {{ task.deadline }}</span>
          </div>
        </div>
      </div>
      <div class="progress-summary">
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="progressPercent"></div>
        </div>
        <span class="progress-text">{{ completedCount }}/{{ totalCount }} completed</span>
      </div>
    </div>
  `,
    styles: [`
    .tasks-card {
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
        
        .btn-all {
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
      
      .tasks-list {
        padding: 0.5rem;
        
        .task-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
          
          &.completed {
            opacity: 0.7;
            
            .task-name {
              text-decoration: line-through;
            }
          }
          
          .task-checkbox {
            font-size: 1.2rem;
          }
          
          .task-info {
            flex: 1;
            
            .task-name {
              display: block;
              font-size: 0.875rem;
              color: #333;
            }
            
            .task-deadline {
              font-size: 0.7rem;
              color: #64748b;
            }
          }
        }
      }
      
      .progress-summary {
        padding: 1rem;
        border-top: 1px solid #e2e8f0;
        
        .progress-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
          
          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            border-radius: 4px;
            transition: width 0.3s;
          }
        }
        
        .progress-text {
          font-size: 0.7rem;
          color: #64748b;
        }
      }
    }
  `]
})
export class TasksProgress {
    @Input() tasks: Task[] = [];
    @Input() completedCount: number = 0;
    @Input() totalCount: number = 0;
    @Output() viewAll = new EventEmitter<void>();

    get displayTasks(): Task[] {
        return this.tasks.slice(0, 3);
    }

    get progressPercent(): number {
        return (this.completedCount / this.totalCount) * 100;
    }
}