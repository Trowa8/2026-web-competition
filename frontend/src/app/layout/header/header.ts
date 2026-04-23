import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrls: ['./header.css']
})
export class Header {
    public authService = inject(AuthService);
    private router = inject(Router);

    public async logout(): Promise<void> {
        await this.authService.logout();
        this.router.navigate(['/login']);
    }
}