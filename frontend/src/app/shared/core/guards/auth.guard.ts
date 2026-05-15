import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

export const authGuard = () => {
    const auth: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return auth.isAuthenticated() ? true : router.parseUrl("/login");
};
