import { Component, signal } from '@angular/core';
import { TournamentForm } from './components/tournament-form/tournament-form';
import { Leaderboard } from './components/leaderboard/leaderboard';
import { LeaderboardItem } from '../../shared/types/tournament.types';

@Component({
    selector: 'app-create-tournament',
    standalone: true,
    imports: [TournamentForm, Leaderboard],
    templateUrl: './create-tournament.html',
    styleUrl: './create-tournament.css',
})
export class CreateTournamentPage {
    leaderboard = signal<LeaderboardItem[]>([
        { teamName: 'Code Masters', score: 95 },
        { teamName: 'Bug Hunters', score: 87 },
    ]);

    onCreateTournament(data: { name: string; description: string }) {
        console.log('Create tournament DTO:', data);
        alert('Турнір створено (mock)');
    }
}