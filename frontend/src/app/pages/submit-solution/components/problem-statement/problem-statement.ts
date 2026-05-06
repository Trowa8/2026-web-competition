import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-problem-statement',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="problem-card">
      <div class="card-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="card-body">
        <p class="description">{{ description }}</p>
        
        <div class="team-info-section">
          <h3>TEAM INFO</h3>
          <div class="team-buttons">
            <a href="#" class="link">Edit team</a>
            <a href="#" class="link">Create member</a>
          </div>
        </div>
        
        <div class="problem-section">
          <h3>Problem Statement</h3>
          <div class="problem-content">
            {{ problemStatement }}
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .problem-card {
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
        
        .description {
          color: #4a5568;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .team-info-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
          
          h3 {
            font-size: 0.75rem;
            color: #64748b;
            letter-spacing: 1px;
            margin-bottom: 0.5rem;
          }
          
          .team-buttons {
            display: flex;
            gap: 1rem;
            
            .link {
              color: #667eea;
              text-decoration: none;
              font-size: 0.875rem;
              
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        
        .problem-section {
          h3 {
            font-size: 0.875rem;
            color: #333;
            margin-bottom: 0.5rem;
          }
          
          .problem-content {
            background: #f7fafc;
            padding: 1rem;
            border-radius: 0.5rem;
            color: #4a5568;
            font-size: 0.875rem;
            line-height: 1.5;
            min-height: 100px;
          }
        }
      }
    }
  `]
})
export class ProblemStatement {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() problemStatement: string = '';
}