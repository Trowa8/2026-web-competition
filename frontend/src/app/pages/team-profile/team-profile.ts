import { Component, signal } from '@angular/core';
import { TeamProfile } from '../../shared/types/team.types';
import { TeamInfo } from './components/team-info/team-info';
import { TeamMembers } from './components/team-members/team-members';

@Component({
  selector: 'app-team-profile',
  standalone: true,
  imports: [TeamInfo, TeamMembers],
  templateUrl: './team-profile.html',
  styleUrl: './team-profile.css',
})
export class TeamProfilePage {
  team = signal<TeamProfile>({
    id: 1,
    name: 'Code Masters',
    description: 'Ми команда, яка створює найкращі рішення 🚀',
    avatarUrl: '',
    members: [
      { id: 1, name: 'Timofey', role: 'Frontend' },
      { id: 2, name: 'Alex', role: 'Backend' },
    ],
  });
}