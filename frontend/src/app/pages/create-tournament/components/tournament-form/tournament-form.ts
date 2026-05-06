import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tournament-form-card">
      <div class="card-header">
        <h2>Tournament Information</h2>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Tournament Name *</label>
          <input 
            type="text" 
            [(ngModel)]="tournamentName"
            (input)="onChange()"
            placeholder="Enter tournament name"
            class="form-control">
        </div>
        
        <div class="form-group">
          <label>Description</label>
          <textarea 
            [(ngModel)]="description"
            (input)="onChange()"
            rows="3"
            placeholder="Describe your tournament..."
            class="form-control"></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Start Date *</label>
            <input 
              type="date" 
              [(ngModel)]="startDate"
              (change)="onChange()"
              class="form-control">
          </div>
          <div class="form-group">
            <label>End Date *</label>
            <input 
              type="date" 
              [(ngModel)]="endDate"
              (change)="onChange()"
              class="form-control">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Number of Teams</label>
            <select [(ngModel)]="numberOfTeams" (change)="onChange()" class="form-control">
              <option [value]="4">4 Teams</option>
              <option [value]="8">8 Teams</option>
              <option [value]="16">16 Teams</option>
              <option [value]="32">32 Teams</option>
            </select>
          </div>
          <div class="form-group">
            <label>Prize Pool</label>
            <input 
              type="text" 
              [(ngModel)]="prizePool"
              (input)="onChange()"
              placeholder="$0"
              class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label>Tournament Format</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" value="single" [(ngModel)]="format" (change)="onChange()">
              Single Elimination
            </label>
            <label class="radio-label">
              <input type="radio" value="double" [(ngModel)]="format" (change)="onChange()">
              Double Elimination
            </label>
            <label class="radio-label">
              <input type="radio" value="round" [(ngModel)]="format" (change)="onChange()">
              Round Robin
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tournament-form-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      overflow: hidden;
      
      .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem 1.5rem;
        
        h2 {
          color: white;
          margin: 0;
          font-size: 1.25rem;
        }
      }
      
      .card-body {
        padding: 1.5rem;
      }
      
      .form-group {
        margin-bottom: 1rem;
        
        label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          
          &:focus {
            outline: none;
            border-color: #667eea;
          }
        }
      }
      
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      
      .radio-group {
        display: flex;
        gap: 1.5rem;
        
        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
        }
      }
    }
  `]
})
export class TournamentForm {
  @Output() tournamentInfoUpdated = new EventEmitter<any>();

  tournamentName: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  numberOfTeams: number = 8;
  prizePool: string = '';
  format: string = 'single';

  onChange() {
    this.tournamentInfoUpdated.emit({
      name: this.tournamentName,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      numberOfTeams: this.numberOfTeams,
      prizePool: this.prizePool,
      format: this.format
    });
  }
}