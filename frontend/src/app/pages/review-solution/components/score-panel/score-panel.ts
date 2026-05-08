import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-score-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './score-panel.html',
  styleUrls: ['./score-panel.css']
})
export class ScorePanel {
  @Output() scoreSubmitted = new EventEmitter<{ score: number; feedback: string }>();

  criteria = {
    codeQuality: 0,
    algorithm: 0,
    efficiency: 0,
    documentation: 0
  };

  get totalScore(): number {
    return this.criteria.codeQuality + this.criteria.algorithm +
      this.criteria.efficiency + this.criteria.documentation;
  }

  setQuickScore(score: number) {
    const ratio = score / 100;
    this.criteria.codeQuality = Math.round(25 * ratio);
    this.criteria.algorithm = Math.round(30 * ratio);
    this.criteria.efficiency = Math.round(25 * ratio);
    this.criteria.documentation = Math.round(20 * ratio);
  }

  submitScore() {
    this.scoreSubmitted.emit({
      score: this.totalScore,
      feedback: `Code Quality: ${this.criteria.codeQuality}/25, Algorithm: ${this.criteria.algorithm}/30, Efficiency: ${this.criteria.efficiency}/25, Documentation: ${this.criteria.documentation}/20`
    });
  }
}