import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-section">
      <h1>Welcome to Judge Portal</h1>
      <p *ngIf="!isLoggedIn">Join competitive coding tournaments and showcase your skills</p>
      <p *ngIf="isLoggedIn">Welcome back! Ready to compete today?</p>
      
      <div class="hero-buttons" *ngIf="!isLoggedIn">
        <button class="btn-primary" (click)="signup.emit()">Get Started</button>
        <button class="btn-secondary" (click)="login.emit()">Login</button>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      text-align: center;
      padding: 3rem 2rem;
      color: white;
      
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      p {
        font-size: 1.1rem;
        opacity: 0.9;
        margin-bottom: 1.5rem;
      }
      
      .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        
        .btn-primary, .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
        }
        
        .btn-primary {
          background: white;
          color: #667eea;
          border: none;
          
          &:hover {
            transform: translateY(-2px);
          }
        }
        
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
          
          &:hover {
            background: white;
            color: #667eea;
          }
        }
      }
    }
  `]
})
export class HeroSection {
  @Input() isLoggedIn: boolean = false;
  @Output() login = new EventEmitter<void>();
  @Output() signup = new EventEmitter<void>();
  @Output() selectRole = new EventEmitter<string>();
}