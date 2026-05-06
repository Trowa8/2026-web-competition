import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="feedback-card">
      <div class="card-header">
        <h2>Feedback</h2>
      </div>
      <div class="card-body">
        <div class="feedback-categories">
          <div class="feedback-category">
            <label>Code Quality</label>
            <select [(ngModel)]="feedback.codeQuality">
              <option value="excellent">Excellent ⭐⭐⭐</option>
              <option value="good">Good ⭐⭐</option>
              <option value="average">Average ⭐</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div class="feedback-category">
            <label>Algorithm Approach</label>
            <select [(ngModel)]="feedback.algorithm">
              <option value="optimal">Optimal</option>
              <option value="good">Good</option>
              <option value="acceptable">Acceptable</option>
              <option value="inefficient">Inefficient</option>
            </select>
          </div>
          <div class="feedback-category">
            <label>Documentation</label>
            <select [(ngModel)]="feedback.documentation">
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="minimal">Minimal</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        
        <div class="feedback-text">
          <label>Detailed Feedback</label>
          <textarea 
            [(ngModel)]="feedback.text" 
            rows="4"
            placeholder="Provide detailed feedback to the team..."></textarea>
        </div>
        
        <button class="btn-submit-feedback" (click)="submitFeedback()">
          Submit Review
        </button>
      </div>
    </div>
  `,
  styles: [`
    .feedback-card {
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
      
      .feedback-categories {
        margin-bottom: 1.5rem;
        
        .feedback-category {
          margin-bottom: 1rem;
          
          label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 0.25rem;
          }
          
          select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            font-size: 0.875rem;
          }
        }
      }
      
      .feedback-text {
        margin-bottom: 1.5rem;
        
        label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 0.25rem;
        }
        
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          resize: vertical;
          font-family: inherit;
          
          &:focus {
            outline: none;
            border-color: #667eea;
          }
        }
      }
      
      .btn-submit-feedback {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 600;
        
        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class FeedbackForm {
  @Output() feedbackSubmitted = new EventEmitter<{ score: number; feedback: string }>();

  feedback = {
    codeQuality: 'good',
    algorithm: 'acceptable',
    documentation: 'minimal',
    text: ''
  };

  submitFeedback() {
    this.feedbackSubmitted.emit({
      score: 70,
      feedback: this.feedback.text || JSON.stringify(this.feedback, null, 2)
    });
  }
}