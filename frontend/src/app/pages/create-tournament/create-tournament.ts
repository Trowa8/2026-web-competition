import { Component, inject, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TournamentType } from "../../shared/types/tournament.types";

@Component({
    selector: "app-create-tournament",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./create-tournament.html",
    styleUrls: ["./create-tournament.css"],
})
export class CreateTournamentComponent {
    private router = inject(Router);

    tournamentData: TournamentType = {
        name: "",
        description: "",
        startDate: "",
        createdAt: "",
        createdBy: 0,
        registrationDeadline: "",
        tournamentId: "",
    };

    isLoading: WritableSignal<boolean> = signal<boolean>(false);

    onCreateTournament(): void {
        if (
            !this.tournamentData.name.trim() ||
            !this.tournamentData.startDate ||
            !this.tournamentData.registrationDeadline
        ) {
            return;
        }

        this.isLoading.set(true);

        setTimeout(() => {
            this.isLoading.set(false);
            this.router.navigate(["/tournaments"]);
        }, 2000);
    }
}
