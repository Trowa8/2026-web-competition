import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubmissionService } from '../../shared/services/submission.service';

@Component({
    selector: 'app-submit-solution',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './submit-solution.html',
    styleUrl: './submit-solution.scss'
})
export class SubmitSolutionComponent {

    submission = {
        taskId: 0,
        githubLink: '',
        demoLink: '',
        videoLink: '',
        description: ''
    };

    constructor(
        private submissionService: SubmissionService,
        private router: Router
    ) { }

    async onSubmit() {
        if (!this.submission.taskId || !this.submission.githubLink) {
            alert('Будь ласка, вкажіть ID завдання та посилання на GitHub');
            return;
        }

        try {
            await this.submissionService.submit({
                taskId: this.submission.taskId,
                githubLink: this.submission.githubLink,
                demoLink: this.submission.demoLink || undefined,
                videoLink: this.submission.videoLink || undefined,
                description: this.submission.description || undefined
            });

            alert('Рішення успішно подано!');
            this.router.navigate(['/tournaments']);
        } catch (err) {
            alert('Помилка при подачі рішення. Перевірте дані.');
        }
    }
}