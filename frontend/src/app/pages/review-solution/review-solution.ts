import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-solution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-solution.html',
  styleUrls: ['./review-solution.css']
})
export class ReviewSolutionComponent {
  readonly reviewStats = signal({ toReview: 7, scored: 24, avgScore: 7.8 });
  readonly solution = signal({
    id: '2847',
    task: 'Task A',
    code: '/* Code snippet here, syntax highlighted with dark background */\nfunction validate() {\n  return true;\n}'
  });

  scoreAlgo = '';
  scoreQuality = '';
  comment = '';

  saveScore() {
    console.log('Saved:', { algo: this.scoreAlgo, quality: this.scoreQuality, comment: this.comment });
  }

  nextSolution() {
    console.log('Next solution');
  }
}