import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSection } from './components/hero-section/hero-section';
import { FeaturedTournaments } from './components/featured-tournaments/featured-tournaments';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { TasksPreview } from './components/tasks-preview/tasks-preview';
import { Footer } from './components/footer/footer';

export interface Tournament {
  id: number;
  name: string;
  date: string;
  teamsCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  deadline: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface User {
  isLoggedIn: boolean;
  name?: string;
  role?: 'participant' | 'judge' | 'organizer';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSection,
    FeaturedTournaments,
    UserDashboard,
    TasksPreview,
    Footer
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  user: User = {
    isLoggedIn: true,
    name: 'Timofey',
    role: 'participant'
  };

  featuredTournaments: Tournament[] = [
    { id: 1, name: 'Code-Arena 2025', date: 'Mon, Aug 17', teamsCount: 24, status: 'upcoming' },
    { id: 2, name: 'Summer Challenge', date: 'Fri, Sep 04', teamsCount: 16, status: 'upcoming' },
    { id: 3, name: 'Winter Cup', date: 'Sat, Dec 12', teamsCount: 32, status: 'upcoming' }
  ];

  userTasks: Task[] = [
    { id: 1, name: 'Task 1: Project Setup', completed: true, deadline: '2026-05-01', priority: 'high' },
    { id: 2, name: 'Task 2: Database Design', completed: true, deadline: '2026-05-03', priority: 'medium' },
    { id: 3, name: 'Task 3: API Development', completed: false, deadline: '2026-05-08', priority: 'high' },
    { id: 4, name: 'Task 4: Frontend Implementation', completed: false, deadline: '2026-05-12', priority: 'medium' }
  ];

  userTournaments: Tournament[] = [
    { id: 1, name: 'Code-Arena 2025', date: 'Aug 17, 2025', teamsCount: 24, status: 'upcoming' },
    { id: 2, name: 'Summer Challenge', date: 'Sep 04, 2025', teamsCount: 16, status: 'ongoing' }
  ];

  get completedTasksCount(): number {
    return this.userTasks.filter(t => t.completed).length;
  }

  get totalTasksCount(): number {
    return this.userTasks.length;
  }

  get taskProgressPercent(): number {
    return (this.completedTasksCount / this.totalTasksCount) * 100;
  }

  get teamRating(): number {
    return 842;
  }

  onSignUp(tournamentId: number) {
    alert(`Signed up for tournament #${tournamentId}`);
  }

  onViewAllTasks() {
    alert('View all tasks');
  }

  onViewAllTournaments() {
    alert('View all tournaments');
  }

  onLogin() {
    alert('Login clicked');
  }

  onSignup() {
    alert('Sign up clicked');
  }

  onSelectRole(role: string) {
    alert(`Selected role: ${role}`);
  }
}