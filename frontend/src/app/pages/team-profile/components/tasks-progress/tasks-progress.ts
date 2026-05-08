import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../team-profile';

@Component({
  selector: 'app-tasks-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-progress.html',
  styleUrls: ['./tasks-progress.css']
})
export class TasksProgress {
  @Input() tasks: Task[] = [];
  @Input() completedCount: number = 0;
  @Input() totalCount: number = 0;
  @Output() viewAll = new EventEmitter<void>();
}