import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-preview-card">
      <h2>Code Preview</h2>
      <div class="code-snippet">
        <pre><code>// Code snippet here
// newrowid=1, rowid is not found

function tournamentLogic() 
  console.log("Welcome to Tournament!");
  return "⚡ Ready to compete!";
end</code></pre>
      </div>
      <div class="anonymous-team">
        <span>👥 Anonymous Team</span>
        <span>Editing a project</span>
      </div>
    </div>
  `,
  styles: [`
    .code-preview-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      padding: 1.5rem;
      
      h2 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.25rem;
      }
    }
    
    .code-snippet {
      background: #1a202c;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
      overflow-x: auto;
      
      pre {
        margin: 0;
        
        code {
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          color: #a0aec0;
          line-height: 1.5;
          white-space: pre-wrap;
        }
      }
    }
    
    .anonymous-team {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: #f7fafc;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: #4a5568;
    }
  `]
})
export class CodePreview { }