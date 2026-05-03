import { Component, inject } from '@angular/core';
import { TaskForm } from './components/task-form/task-form';
import { TournamentTask } from '../../shared/types/tournament-task.type';
import { TaskService } from '../../shared/services/task.service';

@Component({
    selector: 'app-tournament-task',
    standalone: true,
    imports: [TaskForm],
    template: `
    <h2>Create Tournament Task</h2>
    <app-task-form (taskCreated)="handleTaskCreate($event)"></app-task-form>
  `
})
export class TournamentTaskPage {
    private taskService = inject(TaskService);

    async handleTaskCreate(task: TournamentTask) {
        try {
            const dto = {
                title: task.title,
                description: task.description,
                tournamentId: String(task.tournamentId),
            };

            const created = await this.taskService.createTask(dto);
            console.log('Task created:', created);
            alert('Task created successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to create task');
        }
    }
}