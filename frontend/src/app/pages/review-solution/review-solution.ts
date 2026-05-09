import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-solution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-solution.html',
  styleUrls: ['./review-solution.css']
})
export class ReviewSolution {
  onSubmit() {
    alert('✅ Solution submitted for review!');
  }
}