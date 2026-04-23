import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, FooterComponent],
  template: `
        <app-header />
        <main>
            <router-outlet />
        </main>
        <app-footer />
    `,
  styles: [`main { min-height: calc(100vh - 140px); }`]
})
export class AppComponent { }