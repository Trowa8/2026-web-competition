import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-card">
      <div class="card-header">
        <h2>Your Progress</h2>
      </div>
      <div class="card-body">
        <div class="deadline-alert">
          <h3>⏰ Deadline of this task is ending</h3>
          <div class="progress-circle">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#e2e8f0" stroke-width="6"/>
              <circle cx="40" cy="40" r="35" fill="none" stroke="#10b981" stroke-width="6"
                      stroke-dasharray="220" [attr.stroke-dashoffset]="220 - (220 * taskProgress / 100)"
                      stroke-linecap="round" transform="rotate(-90 40 40)"/>
            </svg>
            <span class="progress-text">{{ completedTasks }}/{{ totalTasks }}</span>
          </div>
          <div class="deadline-info">
            <p>{{ completedTasks }} tasks are completed</p>
            <p>Team rating: {{ teamRating }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-card {
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
      
      .card-body {
        padding: 1.5rem;
      }
      
      .deadline-alert {
        text-align: center;
        
        h3 {
          color: #ef4444;
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }
        
        .progress-circle {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
          
          svg {
            transform: rotate(-90deg);
          }
          
          .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: bold;
            font-size: 1rem;
          }
        }
        
        .deadline-info {
          p {
            margin: 0.25rem 0;
            color: #4a5568;
            font-size: 0.875rem;
          }
        }
      }
    }
  `]
})
export class UserDashboard {
  @Input() completedTasks: number = 0;
  @Input() totalTasks: number = 0;
  @Input() teamRating: number = 0;
  @Input() taskProgress: number = 0;
}