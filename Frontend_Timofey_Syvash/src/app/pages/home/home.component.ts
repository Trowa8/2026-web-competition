import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks = [
    { id: 1, name: 'Завдання 1', completed: false },
    { id: 2, name: 'Завдання 2', completed: true },
    { id: 3, name: 'Завдання 3', completed: false }
  ];

  tournaments = [
    { id: 1, name: 'Cyber Cup', status: 'upcoming' },
    { id: 2, name: 'Game Masters', status: 'ongoing' },
    { id: 3, name: 'Pro League', status: 'upcoming' }
  ];

  getCompletedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  getTotalTasks(): number {
    return this.tasks.length;
  }
}