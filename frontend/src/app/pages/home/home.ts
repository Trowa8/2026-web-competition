import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { MainLayout } from '../../layouts/main-layout/main-layout';
=======
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout';
>>>>>>> upstream/main

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterModule, MainLayout],
=======
  imports: [CommonModule, RouterModule, MainLayoutComponent],
>>>>>>> upstream/main
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  tasks = [
    { id: 1, name: 'Завдання 1', completed: false },
    { id: 2, name: 'Завдання 2', completed: true },
    { id: 3, name: 'Завдання 3', completed: false }
  ];

  getCompletedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  getTotalTasks(): number {
    return this.tasks.length;
  }
}