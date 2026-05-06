import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../submit-solution.page';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="members-card">
      <div class="card-header">
        <h2>MEMBERS</h2>
        <span class="count">{{ members.length }} members</span>
      </div>
      <div class="members-list">
        <div *ngFor="let member of members" class="member-item">
          <span class="avatar">👤</span>
          <span class="name">{{ member.name }}</span>
          <button class="btn-view">View →</button>
        </div>
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
          padding: 0.25rem 0.5rem;
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
          transition: background 0.2s;
          
          &:hover {
            background: #f7fafc;
          }
          
          .avatar {
            font-size: 1.5rem;
          }
          
          .name {
            flex: 1;
            font-weight: 500;
            color: #333;
          }
          
          .btn-view {
            background: none;
            border: none;
            color: #667eea;
            cursor: pointer;
            font-size: 0.75rem;
            
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  `]
})
export class MembersList {
  @Input() members: Member[] = [];
}