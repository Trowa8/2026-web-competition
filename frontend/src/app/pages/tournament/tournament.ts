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
    CodePreview,
  ],
  templateUrl: './tournament.html',
  styleUrls: ['./tournament.css']
})
export class Tournament {
  tournamentInfo = {
    teamsCount: 16,
    startDate: '03.04.2025',
    endDate: '10.04.2025'
  };

  isSignedUp = false;
  signUpMessage = '';

  goHome() { alert('🏠 Головна сторінка'); }
  goCommunity() { alert('👥 Наша спільнота'); }
  goTournaments() { alert('🏆 Список турнірів'); }
  goMyTeam() { alert('👤 Моя команда'); }
  goProfile() { alert('👤 Профіль'); }

  onSignUp() {
    this.isSignedUp = true;
    this.signUpMessage = '✅ Ви успішно зареєструвались на турнір!';
    setTimeout(() => {
      this.signUpMessage = '';
    }, 3000);
  }
}