import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-team-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="team-form-card">
      <div class="card-header">
        <h2>Team Information</h2>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Team Name *</label>
          <input 
            type="text" 
            [(ngModel)]="teamName"
            (input)="onChange()"
            placeholder="Enter your team name"
            class="form-control">
        </div>
        
        <div class="form-group">
          <label>Description (optional)</label>
          <textarea 
            [(ngModel)]="description"
            (input)="onChange()"
            rows="4"
            placeholder="Tell us about your team..."
            class="form-control"></textarea>
        </div>
        
        <div class="form-group">
          <label>Team Logo</label>
          <div class="logo-upload">
            <button class="btn-upload">📁 Upload Logo</button>
            <span class="hint">PNG, JPG up to 2MB</span>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .team-form-card {
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
      
      .form-group {
        margin-bottom: 1.25rem;
        
        label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
          
          &:focus {
            outline: none;
            border-color: #667eea;
          }
        }
        
        .logo-upload {
          display: flex;
          align-items: center;
          gap: 1rem;
          
          .btn-upload {
            padding: 0.5rem 1rem;
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            cursor: pointer;
            
            &:hover {
              background: #edf2f7;
            }
          }
          
          .hint {
            font-size: 0.7rem;
            color: #64748b;
          }
        }
      }
    }
  `]
})
export class TeamForm {
    @Output() teamInfoUpdated = new EventEmitter<{ name: string; description: string }>();

    teamName: string = '';
    description: string = '';

    onChange() {
        this.teamInfoUpdated.emit({
            name: this.teamName,
            description: this.description
        });
    }
}