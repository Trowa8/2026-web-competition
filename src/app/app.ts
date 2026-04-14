import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { UiButton } from './shared/ui-button/ui-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, UiButton],
  template: `
    <div class="app-wrapper">
      <app-header></app-header>

      <main class="content button-collection">
        <section class="hero">
        </section>

        <section class="button-gallery">
          <div class="button-row">
            <app-button text="Main" color="primary" variant="solid" (onClick)="notify('Primary clicked')"></app-button>
            <app-button text="Registration" color="secondary" variant="solid" (onClick)="notify('Secondary clicked')"></app-button>
            <app-button text="Disabled" color="secondary" variant="solid" [disabled]="true"></app-button>
            <app-button text="Leave" color="leave" variant="solid" (onClick)="notify('Secondary clicked')"></app-button>

          </div>
        </section>

        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app.scss']
})
export class AppComponent {
  notify(message: string) {
    console.log(message);
  }
}
