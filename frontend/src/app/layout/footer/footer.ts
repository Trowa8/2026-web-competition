import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
        <footer>
            <p>© 2026 Турнірна система. Всі права захищено.</p>
        </footer>
    `,
    styles: [`
        footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            margin-top: auto;
        }
    `]
})
export class FooterComponent { }