import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-team-info',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="team-info-card">
      <div class="card-header">
        <h2>{{ teamName }}</h2>
        <span class="badge">Team Profile</span>
      </div>
      <div class="card-body">
        <p>Interact your team and view teammate history.</p>
        <div class="buttons">
          <button class="btn-edit">✏️ Edit team</button>
          <button class="btn-create">➕ Create member</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .team-info-card {
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
        padding: 1.5rem;
        
        p {
          color: #4a5568;
          margin-bottom: 1rem;
        }
        
        .buttons {
          display: flex;
          gap: 1rem;
          
          button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            
            &.btn-edit {
              background: #e2e8f0;
              color: #4a5568;
              
              &:hover {
                background: #cbd5e0;
              }
            }
            
            &.btn-create {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              
              &:hover {
                transform: translateY(-2px);
              }
            }
          }
        }
      }
    }
  `]
})
export class TeamInfo {
    @Input() teamName: string = '';
}