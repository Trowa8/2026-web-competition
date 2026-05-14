import { Component, computed, inject, Signal } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserType } from "../../types/auth.types";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./header.html",
    styleUrls: ["./header.css"],
})
export class Header {
    private auth = inject(AuthService);
    private router = inject(Router);

    user: Signal<UserType | null> = computed(() => this.auth.user());

    async logout() {
        await this.auth.logout();
        this.router.navigate(["/login"]);
    }
}
