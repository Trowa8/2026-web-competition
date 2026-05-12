import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-review-solution',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './review-solution.html',
    styleUrl: './review-solution.css',
})
export class ReviewSolution {
    solutionId = signal('');
    score = signal<number | null>(null);
    comment = signal('');

    isSubmitting = signal(false);

    submit() {
        if (!this.solutionId() || this.score() === null) {
            alert('Заповніть обовʼязкові поля');
            return;
        }

        const dto = {
            solutionId: this.solutionId(),
            score: this.score(),
            comment: this.comment(),
        };

        this.isSubmitting.set(true);

        console.log('Create Evaluation DTO:', dto);

        setTimeout(() => {
            this.isSubmitting.set(false);
            alert('Оцінка відправлена (mock)');
        }, 500);
    }
}