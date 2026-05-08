import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-review.html',
  styleUrls: ['./code-review.css']
})
export class CodeReview {
  @Input() code: string = '';

  copyCode() {
    navigator.clipboard.writeText(this.code);
    alert('✅ Код скопійовано!');
  }
}