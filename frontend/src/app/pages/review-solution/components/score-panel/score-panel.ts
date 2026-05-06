import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-score-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="score-panel-card">
      <div class="card-header">
        <h2>Scoring</h2>
      </div>
      <div class="card-body">
        <div class="score-criteria">
          <div class="criteria-item">
            <label>Code Quality (0-25)</label>
            <input type="range" min="0" max="25" [(ngModel)]="codeQuality" (input)="updateTotal()">
            <span>{{ codeQuality }}/25</span>
          </div>
          <div class="criteria-item">
            <label>Algorithm (0-30)</label>
            <input type="range" min="0" max="30" [(ngModel)]="algorithm" (input)="updateTotal()">
            <span>{{ algorithm }}/30</span>
          </div>
          <div class="criteria-item">
            <label>Efficiency (0-25)</label>
            <input type="range" min="0" max="25" [(ngModel)]="efficiency" (input)="updateTotal()">
            <span>{{ efficiency }}/25</span>
          </div>
          <div class="criteria-item">
            <label>Documentation (0-20)</label>
            <input type="range" min="0" max="20" [(ngModel)]="documentation" (input)="updateTotal()">
            <span>{{ documentation }}/20</span>
          </div>
        </div>
        
        <div class="total-score">
          <span>Total Score:</span>
          <strong>{{ totalScore }}/100</strong>
        </div>
        
        <div class="quick-scores">
          <h3>Quick Scores</h3>
          <div class="quick-buttons">
            <button (click)="setScore(0)" class="score-0">0</button>
            <button (click)="setScore(25)" class="score-25">25</button>
            <button (click)="setScore(50)" class="score-50">50</button>
            <button (click)="setScore(75)" class="score-75">75</button>
            <button (click)="setScore(85)" class="score-85">85</button>
            <button (click)="setScore(95)" class="score-95">95</button>
            <button (click)="setScore(100)" class="score-100">100</button>
          </div>
        </div>
        
        <button class="btn-submit" (click)="submitScore()">
          Submit Score
        </button>
      </div>
    </div>
  `,
  styles: [`
    .score-panel-card {
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
      
      .score-criteria {
        margin-bottom: 1.5rem;
        
        .criteria-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          
          label {
            width: 140px;
            font-size: 0.875rem;
            color: #4a5568;
          }
          
          input {
            flex: 1;
            cursor: pointer;
          }
          
          span {
            width: 50px;
            font-weight: 600;
            color: #667eea;
          }
        }
      }
      
      .total-score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f7fafc;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
        
        strong {
          font-size: 1.5rem;
          color: #10b981;
        }
      }
      
      .quick-scores {
        margin-bottom: 1.5rem;
        
        h3 {
          font-size: 0.875rem;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        
        .quick-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          
          button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            
            &.score-0 { background: #ef4444; color: white; }
            &.score-25 { background: #f97316; color: white; }
            &.score-50 { background: #eab308; color: white; }
            &.score-75 { background: #84cc16; color: white; }
            &.score-85 { background: #22c55e; color: white; }
            &.score-95 { background: #10b981; color: white; }
            &.score-100 { background: #059669; color: white; }
            
            &:hover {
              transform: translateY(-2px);
            }
          }
        }
      }
      
      .btn-submit {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
export class ScorePanelComponent {
  @Output() scoreSubmitted = new EventEmitter<{ score: number; feedback: string }>();

  codeQuality: number = 0;
  algorithm: number = 0;
  efficiency: number = 0;
  documentation: number = 0;

  get totalScore(): number {
    return this.codeQuality + this.algorithm + this.efficiency + this.documentation;
  }

  updateTotal() {

  }

  setScore(score: number) {
    // Distribute score proportionally
    const ratio = score / 100;
    this.codeQuality = Math.round(25 * ratio);
    this.algorithm = Math.round(30 * ratio);
    this.efficiency = Math.round(25 * ratio);
    this.documentation = Math.round(20 * ratio);
  }

  submitScore() {
    this.scoreSubmitted.emit({
      score: this.totalScore,
      feedback: `Code Quality: ${this.codeQuality}/25, Algorithm: ${this.algorithm}/30, Efficiency: ${this.efficiency}/25, Documentation: ${this.documentation}/20`
    });
  }
}