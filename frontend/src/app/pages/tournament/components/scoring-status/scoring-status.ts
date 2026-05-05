import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scoring-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scoring-card">
      <h2>Scoring</h2>
      <div class="scoring-list">
        <label class="scoring-item">
          <input type="checkbox" checked />
          <span class="checked">Not yet scored</span>
        </label>
        <label class="scoring-item">
          <input type="checkbox" />
          <span>Already finished</span>
        </label>
        <label class="scoring-item">
          <input type="checkbox" />
          <span>Already started</span>
        </label>
        <label class="scoring-item">
          <input type="checkbox" />
          <span>Already submitted</span>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .scoring-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      padding: 1.5rem;
      
      h2 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.25rem;
      }
    }
    
    .scoring-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .scoring-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      
      span.checked {
        color: #10b981;
        text-decoration: line-through;
      }
    }
  `]
})
export class ScoringStatus { }