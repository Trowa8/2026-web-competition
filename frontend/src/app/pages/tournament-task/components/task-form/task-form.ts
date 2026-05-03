import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TournamentTask } from '../../../../shared/types/tournament-task.type';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="task.title" name="title" placeholder="Task title" required />
      <textarea [(ngModel)]="task.description" name="description" placeholder="Description"></textarea>
      <input [(ngModel)]="task.assignedTo" name="assignedTo" placeholder="Assign to" />
      <input [(ngModel)]="task.deadline" name="deadline" type="datetime-local" />
      <button type="submit">Create Task</button>
    </form>
  `
})
export class TaskForm {
  @Output() taskCreated = new EventEmitter<TournamentTask>();
  task: Partial<TournamentTask> = { status: 'pending' };

  onSubmit() {
    if (!this.task.title) return;
    this.taskCreated.emit(this.task as TournamentTask);
  }
}