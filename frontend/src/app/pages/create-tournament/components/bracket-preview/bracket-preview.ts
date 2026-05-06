import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../create-tournament.page';

@Component({
    selector: 'app-bracket-preview',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bracket-card">
      <div class="card-header">
        <h2>Tournament Bracket</h2>
        <span class="badge">{{ numberOfTeams }} Teams</span>
      </div>
      <div class="card-body">
        <div *ngIf="teams.length === 0" class="empty-bracket">
          <span>🎯</span>
          <p>Add teams to see the bracket preview</p>
        </div>
        
        <div *ngIf="teams.length > 0" class="bracket-preview">
          <div class="round">
            <h4>Quarter Finals</h4>
            <div *ngFor="let match of quarterFinals" class="match">
              <span class="team">{{ match.team1 }}</span>
              <span class="vs">vs</span>
              <span class="team">{{ match.team2 || 'TBD' }}</span>
            </div>
          </div>
          
          <div class="round" *ngIf="teams.length >= 4">
            <h4>Semi Finals</h4>
            <div class="match">
              <span class="team">Winner QF1</span>
              <span class="vs">vs</span>
              <span class="team">Winner QF2</span>
            </div>
            <div class="match">
              <span class="team">Winner QF3</span>
              <span class="vs">vs</span>
              <span class="team">Winner QF4</span>
            </div>
          </div>
          
          <div class="round" *ngIf="teams.length >= 4">
            <h4>Final</h4>
            <div class="match final">
              <span class="team">Winner SF1</span>
              <span class="vs">vs</span>
              <span class="team">Winner SF2</span>
            </div>
          </div>
        </div>
        
        <div class="bracket-note">
          <p>⚡ Bracket will be generated automatically after tournament starts</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .bracket-card {
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
        
        .badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.7rem;
          color: white;
        }
      }
      
      .card-body {
        padding: 1.5rem;
      }
      
      .empty-bracket {
        text-align: center;
        padding: 2rem;
        color: #64748b;
        
        span {
          font-size: 3rem;
          display: block;
          margin-bottom: 0.5rem;
        }
      }
      
      .bracket-preview {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 2rem;
        
        .round {
          flex: 1;
          min-width: 150px;
          
          h4 {
            text-align: center;
            font-size: 0.875rem;
            color: #4a5568;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
          }
          
          .match {
            background: #f7fafc;
            padding: 0.75rem;
            margin-bottom: 0.75rem;
            border-radius: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.75rem;
            
            &.final {
              background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
              font-weight: bold;
            }
            
            .team {
              flex: 1;
            }
            
            .vs {
              padding: 0 0.5rem;
              color: #64748b;
              font-size: 0.7rem;
            }
          }
        }
      }
      
      .bracket-note {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
        text-align: center;
        
        p {
          font-size: 0.7rem;
          color: #64748b;
        }
      }
    }
  `]
})
export class BracketPreview {
    @Input() teams: Team[] = [];
    @Input() numberOfTeams: number = 8;

    get quarterFinals(): { team1: string; team2: string }[] {
        const matches = [];
        const shuffled = [...this.teams];
        for (let i = 0; i < Math.min(8, shuffled.length); i += 2) {
            matches.push({
                team1: shuffled[i]?.name || 'TBD',
                team2: shuffled[i + 1]?.name || 'TBD'
            });
        }
        return matches;
    }
}