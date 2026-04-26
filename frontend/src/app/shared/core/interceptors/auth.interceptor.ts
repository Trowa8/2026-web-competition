import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth: AuthService = inject(AuthService);
    const token: string | null = auth.accessToken();

    if (token) {
        return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
    }
    return next(req);
};
