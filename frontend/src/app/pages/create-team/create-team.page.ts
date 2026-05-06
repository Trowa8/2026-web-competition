import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamForm } from './components/team-form/team-form';
import { MembersList } from './components/members-list/members-list';
import { TeamPreview } from './components/team-preview/team-preview';

export interface TeamMember {
    id: number;
    name: string;
    role?: string;
}

export interface Team {
    name: string;
    description: string;
    members: TeamMember[];
}

@Component({
    selector: 'app-create-team',
    standalone: true,
    imports: [
        CommonModule,
        TeamForm,
        MembersList,
        TeamPreview
    ],
    templateUrl: './create-team.page.html',
    styleUrls: ['./create-team.page.scss']
})
export class CreateTeamPage {
    team: Team = {
        name: '',
        description: '',
        members: []
    };

    suggestedMembers: TeamMember[] = [
        { id: 1, name: 'VouPrchakero3000' },
        { id: 2, name: 'Niksulini' },
        { id: 3, name: 'Stipek' }
    ];

    onTeamInfoUpdated(teamInfo: { name: string; description: string }) {
        this.team.name = teamInfo.name;
        this.team.description = teamInfo.description;
    }

    onMemberAdded(member: TeamMember) {
        if (!this.team.members.find(m => m.id === member.id)) {
            this.team.members = [...this.team.members, member];
        }
    }

    onMemberRemoved(memberId: number) {
        this.team.members = this.team.members.filter(m => m.id !== memberId);
    }

    onCreateTeam() {
        if (!this.team.name.trim()) {
            alert('Please enter a team name');
            return;
        }
        if (this.team.members.length === 0) {
            alert('Please add at least one member to your team');
            return;
        }

        console.log('Team created:', this.team);
        alert(`Team "${this.team.name}" created successfully with ${this.team.members.length} members!`);
    }
}