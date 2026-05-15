import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";

@Component({
    selector: "app-tournament-details",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./tournament-detail.html",
    styleUrls: ["./tournament-detail.css"],
})
export class TournamentDetailsComponent implements OnInit {
    activeTab: string = "overview";
    tournamentId: string | null = null;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.tournamentId = this.route.snapshot.paramMap.get("id");
    }

    setTab(tab: string) {
        this.activeTab = tab;
    }

    register(): void {
        alert("Ви успішно зареєструвалися на турнір!");
    }

    share(): void {
        const url = window.location.href;
        
        navigator.clipboard.writeText(url).then(
            () => alert("Посилання на турнір скопійовано в буфер обміну!"),
        );
    }
}
