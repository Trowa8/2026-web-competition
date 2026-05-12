import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInfo } from './components/team-info/team-info';
import { ProblemStatement } from './components/problem-statement/problem-statement';
import { MembersList } from './components/members-list/members-list';
import { CodeEditor } from './components/code-editor/code-editor';

@Component({
  selector: 'app-submit-solution',
  standalone: true,
  imports: [CommonModule, TeamInfo, ProblemStatement, MembersList, CodeEditor],
  templateUrl: './submit-solution.html',
  styleUrls: ['./submit-solution.css']
})
export class SubmitSolution {
  teamName = 'Code/Arena';
  isEditingTeam = false;
  newTeamName = '';

  goHome() { alert('🏠 Головна сторінка - в розробці'); }
  goCommunity() { alert('👥 Наша спільнота - в розробці'); }
  goTournaments() { alert('🏆 Турніри - в розробці'); }
  goMyTeam() { alert('👤 Моя команда - в розробці'); }
  goProfile() { alert('👤 Профіль - в розробці'); }

  startEditTeam() {
    this.isEditingTeam = true;
    this.newTeamName = this.teamName;
  }

  saveTeamName() {
    if (this.newTeamName.trim()) {
      this.teamName = this.newTeamName;
    }
    this.isEditingTeam = false;
  }

  cancelEditTeam() {
    this.isEditingTeam = false;
  }

  onAddMember(memberName: string) {
    console.log('Новий учасник:', memberName);
  }

  onSolutionSubmitted(code: string) {
    alert('✅ Рішення успішно надіслано!');
    console.log('Надісланий код:', code);
  }
}