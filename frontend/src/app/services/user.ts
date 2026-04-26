import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class User {
    private apiUrl = "http://localhost:3000/api";

    constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }) {
        return this.http.post(`${this.apiUrl}/auth/login`, credentials);
    }

    getProfile() {
        return this.http.get(`${this.apiUrl}/users/me`);
    }
}
