import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SolutionService } from '../../shared/services/solution.service';

@Component({
  selector: 'app-review-solution',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './review-solution.html',
  styleUrls: ['./review-solution.css']
})
export class ReviewSolutionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly solutionService = inject(SolutionService);

  solId = this.route.snapshot.params['id'];
  score = signal(100);
  feedback = signal('');
  isSubmitting = signal(false);

  ngOnInit() {
    if (this.solId) {
      this.solutionService.getSolutionById(this.solId).subscribe();
    }
  }

  onSubmitReview() {
    this.isSubmitting.set(true);
    this.solutionService.submitReview(this.solId, {
      score: this.score(),
      feedback: this.feedback()
    }).subscribe({
      next: () => {
        alert('Рішення успішно оцінено!');
        this.router.navigate(['/tasks']);
      },
      error: () => this.isSubmitting.set(false)
    });
  }
}