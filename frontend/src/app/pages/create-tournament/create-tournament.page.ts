import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentForm } from './components/tournament-form/tournament-form';
import { Leaderboard } from './components/leaderboard/leaderboard';
import { TeamsList } from './components/teams-list/teams-list';
import { BracketPreview } from './components/bracket-preview/bracket-preview';

export interface Team {
    id: number;
    name: string;
    points: number;
    wins: number;
    losses: number;
}

export interface Tournament {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    numberOfTeams: number;
    teams: Team[];
    prizePool?: string;
}

@Component({
    selector: 'app-create-tournament',
    standalone: true,
    imports: [
        CommonModule,
        TournamentForm,
        Leaderboard,
        TeamsList,
        BracketPreview
    ],
    templateUrl: './create-tournament.page.html',
    styleUrls: ['./create-tournament.page.scss']
})
export class CreateTournamentPage {
    tournament: Tournament = {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        numberOfTeams: 8,
        teams: []
    };

    leaderboardTeams: Team[] = [
        { id: 1, name: 'Alpha Team', points: 67, wins: 8, losses: 2 },
        { id: 2, name: 'Beta Squad', points: 42, wins: 5, losses: 5 },
        { id: 3, name: 'Gamma Force', points: 32, wins: 4, losses: 6 },
        { id: 4, name: 'Delta Unit', points: 28, wins: 3, losses: 7 }
    ];

    onTournamentInfoUpdated(tournamentInfo: Partial<Tournament>) {
        this.tournament = { ...this.tournament, ...tournamentInfo };
    }

    onTeamAdded(team: Team) {
        if (!this.tournament.teams.find(t => t.id === team.id)) {
            this.tournament.teams = [...this.tournament.teams, team];
        }
    }

    onTeamRemoved(teamId: number) {
        this.tournament.teams = this.tournament.teams.filter(t => t.id !== teamId);
    }

    onCreateTournament() {
        if (!this.tournament.name.trim()) {
            alert('Please enter a tournament name');
            return;
        }
        if (!this.tournament.startDate || !this.tournament.endDate) {
            alert('Please select tournament dates');
            return;
        }
        if (this.tournament.teams.length < 2) {
            alert('Please add at least 2 teams to the tournament');
            return;
        }

        console.log('Tournament created:', this.tournament);
        alert(`Tournament "${this.tournament.name}" created successfully with ${this.tournament.teams.length} teams!`);
    }
}