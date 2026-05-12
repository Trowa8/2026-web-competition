import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-upload-solution',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './upload-solution.html',
    styleUrl: './upload-solution.css',
})
export class UploadSolution {
    taskId = signal('');
    githubUrl = signal('');
    demoUrl = signal('');

    isSubmitting = signal(false);

    submit() {
        if (!this.taskId() || !this.githubUrl() || !this.demoUrl()) {
            alert('Заповніть всі поля');
            return;
        }

        const dto = {
            taskId: this.taskId(),
            githubUrl: this.githubUrl(),
            demoUrl: this.demoUrl(),
        };

        this.isSubmitting.set(true);

        console.log('Create Solution DTO:', dto);

        setTimeout(() => {
            this.isSubmitting.set(false);
            alert('Рішення відправлено (mock)');
        }, 500);
    }
}