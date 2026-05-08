import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackForm {
  @Output() feedbackSubmitted = new EventEmitter<{ score: number; feedback: string }>();

  feedback = {
    text: '',
    codeQuality: 'good',
    algorithm: 'acceptable',
    documentation: 'minimal'
  };

  submitFeedback() {
    if (!this.feedback.text.trim()) {
      alert('Будь ласка, залиште фідбек перед відправкою!');
      return;
    }

    this.feedbackSubmitted.emit({
      score: 0,
      feedback: this.feedback.text
    });
  }
}