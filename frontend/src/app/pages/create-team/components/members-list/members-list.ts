import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TeamMember {
    id: number;
    name: string;
    role?: string;
}

@Component({
    selector: 'app-members-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="members-card">
      <div class="card-header">
        <h2>Team Members</h2>
        <span class="count">{{ members.length }} members</span>
      </div>
      <div class="card-body">
        <div *ngIf="members.length === 0" class="empty-members">
          <span>👥</span>
          <p>No members yet. Add members from the left panel.</p>
        </div>
        
        <div *ngFor="let member of members" class="member-item">
          <div class="member-info">
            <span class="avatar">👤</span>
            <span class="name">{{ member.name }}</span>
            <span class="role" *ngIf="member.role">{{ member.role }}</span>
          </div>
          <button class="btn-remove" (click)="onRemove(member.id)">✖ Remove</button>
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
          font-size: 1.25rem;
        }
        
        .count {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          color: white;
        }
      }
      
      .card-body {
        padding: 1rem;
      }
      
      .empty-members {
        text-align: center;
        padding: 2rem;
        color: #64748b;
        
        span {
          font-size: 3rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        p {
          font-size: 0.875rem;
        }
      }
      
      .member-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid #e2e8f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .member-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          
          .avatar {
            font-size: 1.25rem;
          }
          
          .name {
            font-weight: 500;
            color: #333;
          }
          
          .role {
            font-size: 0.7rem;
            color: #667eea;
            background: #ede9fe;
            padding: 0.2rem 0.5rem;
            border-radius: 999px;
          }
        }
        
        .btn-remove {
          padding: 0.25rem 0.75rem;
          background: #fee2e2;
          border: none;
          border-radius: 0.5rem;
          color: #ef4444;
          cursor: pointer;
          font-size: 0.75rem;
          
          &:hover {
            background: #fecaca;
          }
        }
      }
    }
  `]
})
export class MembersList {
    @Input() members: TeamMember[] = [];
    @Output() memberRemoved = new EventEmitter<number>();

    onRemove(memberId: number) {
        this.memberRemoved.emit(memberId);
    }
}