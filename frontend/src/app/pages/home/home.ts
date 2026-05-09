import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  userName = 'Timofey';

  tournaments = [
    { id: 1, name: 'Code-Arena 2025', date: 'Aug 17, 2025', teams: 24, status: 'upcoming' },
    { id: 2, name: 'Summer Challenge', date: 'Sep 04, 2025', teams: 16, status: 'upcoming' }
  ];

  tasks = [
    { id: 1, name: 'Task 1: Project Setup', completed: true, deadline: '2026-05-01' },
    { id: 2, name: 'Task 2: Database Design', completed: true, deadline: '2026-05-03' },
    { id: 3, name: 'Task 3: API Development', completed: false, deadline: '2026-05-08' },
    { id: 4, name: 'Task 4: Frontend Implementation', completed: false, deadline: '2026-05-12' }
  ];

  get completedCount() {
    return this.tasks.filter(t => t.completed).length;
  }

  get totalCount() {
    return this.tasks.length;
  }

  onSignUp(id: number) {
    alert(`✅ You signed up for tournament #${id}`);
  }
}