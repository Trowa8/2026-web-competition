import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamHeader } from './components/team-header/team-header';
import { TeamStats } from './components/team-stats/team-stats';
import { MembersList } from './components/members-list/members-list';
import { TournamentHistory } from './components/tournament-history/tournament-history';
import { TasksProgress } from './components/tasks-progress/tasks-progress';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

export interface Tournament {
  id: number;
  name: string;
  date: string;
  position: number;
  points: number;
}

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  deadline: string;
}

@Component({
  selector: 'app-team-profile',
  standalone: true,
  imports: [CommonModule, TeamHeader, TeamStats, MembersList, TournamentHistory, TasksProgress],
  templateUrl: './team-profile.html',
  styleUrls: ['./team-profile.css']
})
export class TeamProfile {
  teamName = 'Alpha Team';
  teamLogo = '🏆';
  teamDescription = 'Competitive coding team since 2023';

  stats = {
    totalParticipants: 14,
    wins: 8,
    losses: 4,
    rating: 842,
    winRate: 67
  };

  members: TeamMember[] = [
    { id: 1, name: 'VouPrchakero3000', role: 'Captain', avatar: '👨‍💻' },
    { id: 2, name: 'Niksulini', role: 'Co-Captain', avatar: '👩‍💻' },
    { id: 3, name: 'Stipek', role: 'Member', avatar: '👨‍🎓' },
    { id: 4, name: 'User A', role: 'Member', avatar: '👤' },
    { id: 5, name: 'User B', role: 'Member', avatar: '👤' },
    { id: 6, name: 'User C', role: 'Member', avatar: '👤' }
  ];

  tournaments: Tournament[] = [
    { id: 1, name: 'Code-Arena 2025', date: 'Aug 17, 2025', position: 1, points: 100 },
    { id: 2, name: 'Summer Challenge', date: 'Sep 04, 2025', position: 2, points: 85 },
    { id: 3, name: 'Winter Cup', date: 'Dec 12, 2025', position: 3, points: 75 },
    { id: 4, name: 'Spring Masters', date: 'Mar 20, 2026', position: 4, points: 65 }
  ];

  tasks: Task[] = [
    { id: 1, name: 'Task 1: Project Setup', completed: true, deadline: '2026-05-01' },
    { id: 2, name: 'Task 2: Database Design', completed: true, deadline: '2026-05-03' },
    { id: 3, name: 'Task 3: API Development', completed: false, deadline: '2026-05-08' },
    { id: 4, name: 'Task 4: Frontend Implementation', completed: false, deadline: '2026-05-12' },
    { id: 5, name: 'Task 5: Testing & Deployment', completed: false, deadline: '2026-05-15' }
  ];

  get completedTasksCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  get totalTasksCount(): number {
    return this.tasks.length;
  }

  get taskProgressPercent(): number {
    return (this.completedTasksCount / this.totalTasksCount) * 100;
  }

  onEditProfile() {
    const newName = prompt('Enter new team name:', this.teamName);
    if (newName && newName.trim()) {
      this.teamName = newName;
    }
  }

  onViewHistory() {
    alert('📊 Повна історія турнірів\n\n' + this.tournaments.map(t => `${t.name}: #${t.position} (${t.points} pts)`).join('\n'));
  }

  onViewAllTasks() {
    alert('📋 Всі завдання\n\n' + this.tasks.map(t => `${t.name} - ${t.completed ? '✅' : '⏳'}`).join('\n'));
  }

  onViewAllTournaments() {
    alert('🏆 Всі турніри\n\n' + this.tournaments.map(t => `${t.name} - ${t.date}`).join('\n'));
  }

  onViewMember(member: TeamMember) {
    alert(`📋 Учасник: ${member.name}\n🎭 Роль: ${member.role}\n✅ Статус: Active`);
  }
}