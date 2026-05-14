import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { CreateTaskDto } from '../../shared/types/task.types';

@Component({
    selector: 'app-create-task',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-task.html',
    styleUrl: './create-task.css'
})
export class CreateTaskComponent {
    task = signal<CreateTaskDto>({
        title: '',
        description: '',
        constraints: '',
        inputExample: '',
        outputExample: ''
    });

    isSubmitting = signal(false);

    constructor(
        public taskService: TaskService,
        public router: Router
    ) { }

    onSubmit() {
        if (!this.task().title || !this.task().description) {
            alert('Будь ласка, заповніть хоча б назву та опис завдання.');
            return;
        }

        this.isSubmitting.set(true);
        this.taskService.createTask(this.task()).subscribe({
            next: (createdTask) => {
                this.isSubmitting.set(false);
                alert('Завдання створено успішно!');
                this.router.navigate(['/home']);
            },
            error: () => {
                this.isSubmitting.set(false);
                alert('Помилка при створенні завдання.');
            }
        });
    }

    cancel() {
        this.router.navigate(['/home']);
    }
}