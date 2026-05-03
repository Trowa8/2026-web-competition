import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EvaluationService, Evaluation } from '../../shared/services/evaluation.service';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluation.html',
  styleUrl: './evaluation.scss'
})
export class EvaluationClass implements OnInit {

  submissions: any[] = [];
  currentSubmission: any = null;

  score = 0;
  comment = '';

  criteria = {
    technical: 0,
    functionality: 0,
    design: 0,
    presentation: 0
  };

  constructor(private evaluationService: EvaluationService) { }

  async ngOnInit() {
    this.submissions = await this.loadAssignedSubmissions();
  }

  private async loadAssignedSubmissions() {
    return [
      { id: 1, teamName: 'Quantum Coders', taskTitle: 'Розробка фронтенду' },
      { id: 2, teamName: 'Byte Busters', taskTitle: 'Інтеграція API' }
    ];
  }

  selectSubmission(sub: any) {
    this.currentSubmission = sub;
    this.score = 0;
    this.comment = '';
    this.criteria = { technical: 0, functionality: 0, design: 0, presentation: 0 };
  }

  calculateTotal() {
    this.score = Math.round(
      (this.criteria.technical + this.criteria.functionality +
        this.criteria.design + this.criteria.presentation) / 4
    );
  }

  async submitEvaluation() {
    if (!this.currentSubmission) return;

    const evaluation: Evaluation = {
      submissionId: this.currentSubmission.id,
      juryId: 1,
      score: this.score,
      comment: this.comment,
      criteriaScores: this.criteria
    };

    await this.evaluationService.submitEvaluation(evaluation);

    alert('Оцінка успішно збережена!');
    this.currentSubmission = null;
  }
}