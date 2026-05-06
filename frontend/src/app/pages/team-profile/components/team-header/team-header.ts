import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-team-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="team-header-card">
      <div class="team-icon">{{ teamLogo }}</div>
      <div class="team-info">
        <h2>{{ teamName }}</h2>
        <p>{{ teamDescription }}</p>
        <button class="btn-edit" (click)="editProfile.emit()">✏️ Edit Profile</button>
      </div>
    </div>
  `,
    styles: [`
    .team-header-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      gap: 1.5rem;
      align-items: center;
      
      .team-icon {
        font-size: 4rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .team-info {
        flex: 1;
        
        h2 {
          color: #333;
          margin-bottom: 0.25rem;
        }
        
        p {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }
        
        .btn-edit {
          padding: 0.5rem 1rem;
          background: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          
          &:hover {
            background: #edf2f7;
          }
        }
      }
    }
  `]
})
export class TeamHeader {
    @Input() teamName: string = '';
    @Input() teamLogo: string = '';
    @Input() teamDescription: string = '';
    @Output() editProfile = new EventEmitter<void>();
}