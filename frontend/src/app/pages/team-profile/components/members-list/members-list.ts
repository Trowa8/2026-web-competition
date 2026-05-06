import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../team-profile.page';

@Component({
    selector: 'app-members-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="members-card">
      <div class="card-header">
        <h2>MY TEAM</h2>
        <span class="count">{{ members.length }} members</span>
      </div>
      <div class="members-list">
        <div *ngFor="let member of members" class="member-item">
          <span class="avatar">{{ member.avatar || '👤' }}</span>
          <div class="member-info">
            <span class="name">{{ member.name }}</span>
            <span class="role" *ngIf="member.role">{{ member.role }}</span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn-view-all">View All →</button>
      </div>
    </div>
  `,
    styles: [`
    .members-card {
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
        
        .count {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.7rem;
          color: white;
        }
      }
      
      .members-list {
        padding: 0.5rem;
        
        .member-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
          
          .avatar {
            font-size: 1.5rem;
          }
          
          .member-info {
            flex: 1;
            
            .name {
              display: block;
              font-weight: 500;
              color: #333;
            }
            
            .role {
              font-size: 0.7rem;
              color: #667eea;
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
export class MembersList {
    @Input() members: TeamMember[] = [];
}