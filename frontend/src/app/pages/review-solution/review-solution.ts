import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionInfo } from './components/solution-info/solution-info';
import { ScorePanel } from './components/score-panel/score-panel';
import { CodeReview } from './components/code-review/code-review';
import { FeedbackForm } from './components/feedback-form/feedback-form';

@Component({
  selector: 'app-review-solution',
  standalone: true,
  imports: [CommonModule, SolutionInfo, ScorePanel, CodeReview, FeedbackForm],
  templateUrl: './review-solution.html',
  styleUrls: ['./review-solution.css']
})
export class ReviewSolution {
  solution = {
    id: 2847,
    taskName: 'Task 8',
    teamName: 'Anonymous Team',
    submittedAt: '2026-05-08 14:30',
    code: `function solveTournament(teams) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  return {
    winner: sorted[0].name,
    score: sorted[0].score
  };
}`,
    status: 'pending'
  };

  onScoreSubmitted(scoreData: { score: number; feedback: string }) {
    this.solution.status = 'scored';
    alert(`✅ Оцінку виставлено!\n\nБали: ${scoreData.score}/100\nФідбек: ${scoreData.feedback}`);
    console.log('Score submitted:', scoreData);
  }
}