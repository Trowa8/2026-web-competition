import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent {
  tournaments = [
    {
      id: 1,
      title: 'Spring Code Challenge 2026',
      description: 'The biggest algorithmic battle of the season. Showcase your skills in Python, Java or C++.',
      date: 'May 20, 2026',
      participants: 124,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Junior Web Cup',
      description: 'Perfect for beginners. Build a responsive landing page using modern CSS techniques.',
      date: 'June 05, 2026',
      participants: 86,
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Backend Masters: SQL',
      description: 'Complex database optimization tasks for senior developers.',
      date: 'April 12, 2026',
      participants: 45,
      status: 'Finished'
    }
  ];
}