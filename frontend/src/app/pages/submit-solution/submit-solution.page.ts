import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInfo } from './components/team-info/team-info';
import { ProblemStatement } from './components/problem-statement/problem-statement';
import { MembersList } from './components/members-list/members-list';
import { CodeEditor } from './components/code-editor/code-editor';

export interface Member {
    id: number;
    name: string;
}

export interface Team {
    name: string;
    members: Member[];
}

@Component({
    selector: 'app-submit-solution',
    standalone: true,
    imports: [
        CommonModule,
        TeamInfo,
        ProblemStatement,
        MembersList,
        CodeEditor
    ],
    templateUrl: './submit-solution.page.html',
    styleUrls: ['./submit-solution.page.scss']
})
export class SubmitSolutionPage {
    teamName = 'Code/Arena';
    taskTitle = 'Task B: Problem Statement';
    taskDescription = 'Your challenge for #Code-Arena 2023. Write a solution that solves the problem statement below.';
    problemStatement = 'Write a problem statement.';

    members: Member[] = [
        { id: 1, name: 'VouPrchakero3000' },
        { id: 2, name: 'Niksulini' },
        { id: 3, name: 'Stipek' }
    ];

    onSolutionSubmitted(code: string) {
        console.log('Solution submitted:', code);
        alert('Your solution has been submitted successfully!');
    }
}