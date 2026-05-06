import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../create-team.page';

@Component({
    selector: 'app-team-preview',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="preview-card">
      <div class="card-header">
        <h2>Team Preview</h2>
      </div>
      <div class="card-body">
        <div class="preview-content">
          <div class="team-icon">🏆</div>
          <h3>{{ team.name || 'Your Team Name' }}</h3>
          <p>{{ team.description || 'No description yet' }}</p>
          
          <div class="member-count">
            👥 {{ team.members.length }} member(s)
          </div>
          
          <div class="preview-members" *ngIf="team.members.length > 0">
            <div *ngFor="let member of team.members" class="preview-member">
              {{ member.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .preview-card {
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
      
      .preview-content {
        text-align: center;
        
        .team-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        
        h3 {
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        p {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        
        .member-count {
          font-size: 0.875rem;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 1rem;
          padding: 0.5rem;
          background: #f7fafc;
          border-radius: 0.5rem;
        }
        
        .preview-members {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          
          .preview-member {
            padding: 0.25rem 0.75rem;
            background: #ede9fe;
            border-radius: 999px;
            font-size: 0.75rem;
            color: #667eea;
          }
        }
      }
    }
  `]
})
export class TeamPreview {
    @Input() team!: Team;
}