import { Injectable, signal } from '@angular/core';
import { of, delay, tap, Observable } from 'rxjs';
import { Solution, ReviewSolutionRequest } from '../types/solution.types';

@Injectable({ providedIn: 'root' })
export class SolutionService {
  currentSolution = signal<Solution | null>(null);

  getSolutionById(id: string): Observable<Solution> {
    const mock: Solution = {
      id,
      participantName: 'Тимофій Сиваш',
      submittedAt: '2026-05-15 14:20',
      code: 'function solve(n) {\n  return n <= 1 ? 1 : n * solve(n - 1);\n}',
      language: 'javascript',
      status: 'pending',
      tests: [
        { name: 'Логіка факторіалу', passed: true },
        { name: 'Обробка нуля', passed: true },
        { name: 'Граничні значення', passed: false, message: 'Stack overflow' }
      ]
    };
    return of(mock).pipe(delay(200), tap(s => this.currentSolution.set(s)));
  }

  submitReview(id: string, review: ReviewSolutionRequest): Observable<any> {
    return of({ success: true }).pipe(delay(500));
  }
}