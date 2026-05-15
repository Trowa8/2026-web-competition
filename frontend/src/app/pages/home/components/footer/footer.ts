import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <span>🏆 Judge Portal</span>
          <p>© 2023 Judge Portal. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="#">🐦 Twitter: @judgeportal</a>
          <a href="#">📸 Instagram: @judgeportal</a>
          <a href="#">📘 Facebook: @judgeportal</a>
        </div>
        <div class="contacts">
          <span>📧 Tournament@gmail.com</span>
          <span>📞 +380 66 657 66 67</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 1.5rem;
      margin-top: 2rem;
      
      .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        
        @media (max-width: 768px) {
          flex-direction: column;
          text-align: center;
        }
      }
      
      .social-links {
        display: flex;
        gap: 1.5rem;
        
        a {
          color: white;
          text-decoration: none;
          font-size: 0.875rem;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
      
      .contacts {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.75rem;
      }
    }
  `]
})
export class Footer { }