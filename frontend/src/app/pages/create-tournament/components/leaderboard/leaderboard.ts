import { Component, Input } from '@angular/core';
import { LeaderboardItem } from '../../../../shared/types/tournament.types';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    templateUrl: './leaderboard.html',
    styleUrl: './leaderboard.css',
})
export class Leaderboard {
    @Input() items: LeaderboardItem[] = [];
}