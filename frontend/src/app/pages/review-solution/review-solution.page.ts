import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionInfo } from './components/solution-info/solution-info';
import { ScorePanel } from './components/score-panel/score-panel';
import { CodeReview } from './components/code-review/code-review';
import { FeedbackForm } from './components/feedback-form/feedback-form';

export interface Solution {
    id: number;
    taskName: string;
    teamName: string;
    submittedAt: string;
    status: 'pending' | 'reviewing' | 'scored';
    score?: number;
}

@Component({
    selector: 'app-review-solution',
    standalone: true,
    imports: [
        CommonModule,
        SolutionInfo,
        ScorePanel,
        CodeReview,
        FeedbackForm
    ],
    templateUrl: './review-solution.page.html',
    styleUrls: ['./review-solution.page.scss']
})
export class ReviewSolutionPage {
    solution: Solution = {
        id: 2847,
        taskName: 'Task 8',
        teamName: 'Anonymous Team',
        submittedAt: '2026-05-06T14:30:00',
        status: 'reviewing'
    };

    codeContent: string = `// Solution #2847
// Task 8 - Code Arena 2023

function solveTournamentProblem(input) {
  // Initialize variables
  let result = 0;
  
  // Process the input data
  for (let i = 0; i < input.length; i++) {
    result += input[i];
  }
  
  // Return the solution
  return result;
}

// Test case
const testInput = [1, 2, 3, 4, 5];
console.log(solveTournamentProblem(testInput));`;

    onScoreSubmitted(scoreData: { score: number; feedback: string }) {
        console.log('Score submitted:', scoreData);
        alert(`Solution #${this.solution.id} scored: ${scoreData.score}/100\n\nFeedback: ${scoreData.feedback}`);
    }
}