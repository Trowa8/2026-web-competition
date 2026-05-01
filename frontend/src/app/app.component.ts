import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserProfile} from './pages/user-profile/user-profile';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, UserProfile],
    template: `<app-user-profile></app-user-profile>`,
})
export class AppComponent { }