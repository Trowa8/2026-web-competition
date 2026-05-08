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
  onSolutionSubmitted(code: string) {
    alert('Solution submitted successfully!');
    console.log(code);
  }
}