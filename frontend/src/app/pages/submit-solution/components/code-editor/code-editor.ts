import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="code-editor-card">
      <div class="card-header">
        <h2>Code/Arena</h2>
        <span class="badge">Solution Editor</span>
      </div>
      
      <div class="editor-container">
        <div class="editor-toolbar">
          <button class="tool-btn" (click)="formatCode()">📝 Format</button>
          <button class="tool-btn" (click)="clearCode()">🗑️ Clear</button>
          <span class="language">JavaScript</span>
        </div>
        
        <textarea
          #codeTextarea
          [(ngModel)]="code"
          class="code-editor"
          placeholder="// Write your solution here...
          
function solve(input) {
  // Your code here
  return result;
}"
          rows="15"
        ></textarea>
        
        <div class="editor-footer">
          <div class="stats">
            <span>Lines: {{ lineCount }}</span>
            <span>Chars: {{ charCount }}</span>
          </div>
          <button class="btn-submit" (click)="submitSolution()">
            🚀 Submit Solution
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .code-editor-card {
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
      
      .editor-container {
        padding: 1rem;
        
        .editor-toolbar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
          
          .tool-btn {
            padding: 0.25rem 0.75rem;
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 0.75rem;
            
            &:hover {
              background: #edf2f7;
            }
          }
          
          .language {
            margin-left: auto;
            font-size: 0.7rem;
            color: #64748b;
            padding: 0.25rem 0.5rem;
            background: #f7fafc;
            border-radius: 0.375rem;
          }
        }
        
        .code-editor {
          width: 100%;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.5;
          padding: 1rem;
          background: #1a202c;
          color: #a0aec0;
          border: none;
          border-radius: 0.5rem;
          resize: vertical;
          
          &:focus {
            outline: none;
            box-shadow: 0 0 0 2px #667eea;
          }
          
          &::placeholder {
            color: #4a5568;
          }
        }
        
        .editor-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          
          .stats {
            display: flex;
            gap: 1rem;
            font-size: 0.7rem;
            color: #64748b;
          }
          
          .btn-submit {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
            }
          }
        }
      }
    }
  `]
})
export class CodeEditor {
  @Output() submitted = new EventEmitter<string>();

  code: string = '';

  get lineCount(): number {
    return this.code.split('\n').length;
  }

  get charCount(): number {
    return this.code.length;
  }

  formatCode() {
    this.code = this.code.trim();
  }

  clearCode() {
    if (confirm('Are you sure you want to clear your solution?')) {
      this.code = '';
    }
  }

  submitSolution() {
    if (!this.code.trim()) {
      alert('Please write your solution before submitting!');
      return;
    }
    this.submitted.emit(this.code);
  }
}