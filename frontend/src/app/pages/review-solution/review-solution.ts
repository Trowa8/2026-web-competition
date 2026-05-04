import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmissionService } from '../../shared/services/submission.service';
import { EvaluationService } from '../../shared/services/evaluation.service';

@Component({
    selector: 'app-review-solution',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './review-solution.html',
    styleUrl: './review-solution.scss'
})
export class ReviewSolutionComponent implements OnInit {

    submissions: any[] = [];
    selectedSubmission: any = null;

    evaluation = {
        score: 0,
        comment: '',
        technical: 0,
        functionality: 0,
        design: 0,
        presentation: 0
    };

    constructor(
        private submissionService: SubmissionService,
        private evaluationService: EvaluationService
    ) { }

    async ngOnInit() {
        this.loadSubmissions();
    }

    async loadSubmissions() {
        this.submissions = [
            {
                id: 1,
                teamName: 'Quantum Coders',
                taskTitle: 'Розробка фронтенду',
                githubLink: 'https://github.com/...',
                demoLink: 'https://demo.com'
            }
        ];
    }

    selectSubmission(sub: any) {
        this.selectedSubmission = sub;
        this.evaluation = { score: 0, comment: '', technical: 0, functionality: 0, design: 0, presentation: 0 };
    }

    calculateTotal() {
        this.evaluation.score = Math.round(
            (this.evaluation.technical + this.evaluation.functionality +
                this.evaluation.design + this.evaluation.presentation) / 4
        );
    }

    async submitEvaluation() {
        if (!this.selectedSubmission) return;

        await this.evaluationService.submitEvaluation({
            submissionId: this.selectedSubmission.id,
            juryId: 1,
            score: this.evaluation.score,
            comment: this.evaluation.comment,
            criteriaScores: {
                technical: this.evaluation.technical,
                functionality: this.evaluation.functionality,
                design: this.evaluation.design,
                presentation: this.evaluation.presentation
            }
        });

        alert('Оцінка збережена!');
        this.selectedSubmission = null;
    }
}