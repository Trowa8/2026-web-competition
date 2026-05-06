import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter">
      <span>Join as:</span>
      <div class="buttons">
        <button *ngFor="let r of roles" 
                [class.active]="selected === r.value"
                (click)="select(r.value)">
          {{ r.label }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .filter {
      background: rgba(255, 255, 255, 0.95);
      margin: 0 2rem 2rem;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      display: flex;
      gap: 1.5rem;
      align-items: center;
      
      span {
        font-weight: 600;
      }
      
      .buttons {
        display: flex;
        gap: 0.5rem;
        
        button {
          padding: 0.5rem 1.25rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 2rem;
          cursor: pointer;
          
          &.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
            color: white;
          }
        }
      }
    }
  `]
})
export class RoleFilter {
  @Output() roleSelected = new EventEmitter<string>();

  roles = [
    { label: 'All', value: 'all' },
    { label: 'Participant', value: 'participant' },
    { label: 'Judge', value: 'judge' },
    { label: 'Organizer', value: 'organizer' }
  ];

  selected = 'all';

  select(role: string) {
    this.selected = role;
    this.roleSelected.emit(role);
  }
}