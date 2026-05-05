import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentInfo } from './components/tournament-info/tournament-info';
import { TeamsTable } from './components/teams-table/teams-table';
import { ReviewingPanel } from './components/reviewing-panel/reviewing-panel';
import { ScoringStatus } from './components/scoring-status/scoring-status';
import { CodePreview } from './components/code-preview/code-preview';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [
    CommonModule,
    TournamentInfo,
    TeamsTable,
    ReviewingPanel,
    ScoringStatus,
    CodePreview
  ],
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss']
})
export class TournamentPage { }