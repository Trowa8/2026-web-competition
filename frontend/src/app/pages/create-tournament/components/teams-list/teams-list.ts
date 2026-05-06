import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Team } from '../../create-tournament.page';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="teams-card">
      <div class="card-header">
        <h2>Teams</h2>
        <span class="count">{{ teams.length }} / 16 teams</span>
      </div>
      
      <div class="card-body">
        <div class="add-team">
          <input 
            type="text" 
            [(ngModel)]="newTeamName"
            placeholder="Team name"
            (keyup.enter)="addTeam()">
          <button (click)="addTeam()" [disabled]="!newTeamName.trim()">+ Add</button>
        </div>
        
        <div *ngIf="teams.length === 0" class="empty-teams">
          <span>🏆</span>
          <p>No teams added yet. Add teams to start the tournament.</p>
        </div>
        
        <div class="teams-list">
          <div *ngFor="let team of teams; let i = index" class="team-item">
            <span class="team-number">{{ i + 1 }}</span>
            <span class="team-name">{{ team.name }}</span>
            <button class="btn-remove" (click)="onRemove(team.id)">✖</button>
          </div>
        </div>
        
        <div class="suggested-teams" *ngIf="suggestedTeams.length > 0">
          <h3>Suggested Teams</h3>
          <div *ngFor="let team of suggestedTeams" class="suggestion-item">
            <span>{{ team.name }}</span>
            <button (click)="addSuggestedTeam(team)">+ Join</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .teams-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      overflow: hidden;
      
      .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h2 {
          color: white;
          margin: 0;
          font-size: 1.25rem;
        }
        
        .count {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          color: white;
        }
      }
      
      .card-body {
        padding: 1.5rem;
      }
      
      .add-team {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        
        input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.5rem;
          
          &:focus {
            outline: none;
            border-color: #667eea;
          }
        }
        
        button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }
      
      .empty-teams {
        text-align: center;
        padding: 2rem;
        color: #64748b;
        
        span {
          font-size: 3rem;
          display: block;
          margin-bottom: 0.5rem;
        }
      }
      
      .teams-list {
        max-height: 300px;
        overflow-y: auto;
        
        .team-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
          
          .team-number {
            width: 30px;
            font-weight: bold;
            color: #667eea;
          }
          
          .team-name {
            flex: 1;
            font-weight: 500;
            color: #333;
          }
          
          .btn-remove {
            padding: 0.25rem 0.5rem;
            background: #fee2e2;
            border: none;
            border-radius: 0.25rem;
            color: #ef4444;
            cursor: pointer;
          }
        }
      }
      
      .suggested-teams {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
        
        h3 {
          font-size: 0.875rem;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        
        .suggestion-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          
          button {
            padding: 0.25rem 0.75rem;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
          }
        }
      }
    }
  `]
})
export class TeamsList {
  @Input() teams: Team[] = [];
  @Output() teamRemoved = new EventEmitter<number>();

  newTeamName: string = '';

  suggestedTeams = [
    { id: 100, name: 'SuperUltraSuper Team' },
    { id: 101, name: 'BestTeam' },
    { id: 102, name: 'KareyD3000 Team' }
  ];

  addTeam() {
    if (this.newTeamName.trim() && this.teams.length < 16) {
      const newTeam: Team = {
        id: Date.now(),
        name: this.newTeamName.trim(),
        points: 0,
        wins: 0,
        losses: 0
      };
      this.teams = [...this.teams, newTeam];
      this.newTeamName = '';
    }
  }

  addSuggestedTeam(team: any) {
    const newTeam: Team = {
      id: team.id,
      name: team.name,
      points: 0,
      wins: 0,
      losses: 0
    };
    if (!this.teams.find(t => t.id === newTeam.id)) {
      this.teams = [...this.teams, newTeam];
    }
  }

  onRemove(teamId: number) {
    this.teamRemoved.emit(teamId);
  }
}