import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-review',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-review-card">
      <div class="card-header">
        <h2>Code Preview</h2>
        <div class="actions">
          <button class="copy-btn" (click)="copyCode()">📋 Copy</button>
        </div>
      </div>
      <div class="code-container">
        <pre><code [innerHTML]="highlightedCode"></code></pre>
      </div>
    </div>
  `,
  styles: [`
    .code-review-card {
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
        
        .actions {
          .copy-btn {
            padding: 0.25rem 0.75rem;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 0.5rem;
            color: white;
            cursor: pointer;
            
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
      
      .code-container {
        background: #1a202c;
        padding: 1.5rem;
        overflow-x: auto;
        max-height: 500px;
        
        pre {
          margin: 0;
          
          code {
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.5;
            color: #a0aec0;
            white-space: pre-wrap;
          }
        }
      }
    }
  `]
})
export class CodeReview {
  @Input() code: string = '';

  get highlightedCode(): string {
    return this.code
      .replace(/\/\/.*/g, '<span style="color: #68d391;">$&</span>')
      .replace(/function/g, '<span style="color: #fbbf24;">function</span>')
      .replace(/return/g, '<span style="color: #fbbf24;">return</span>')
      .replace(/let|const|var/g, '<span style="color: #60a5fa;">$&</span>')
      .replace(/for|if|else/g, '<span style="color: #f472b6;">$&</span>')
      .replace(/\d+/g, '<span style="color: #fcd34d;">$&</span>');
  }

  copyCode() {
    navigator.clipboard.writeText(this.code);
    alert('Code copied to clipboard!');
  }
}