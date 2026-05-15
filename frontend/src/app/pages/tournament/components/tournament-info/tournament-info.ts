import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-tournament-info",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./tournament-info.html",
    styleUrls: ["./tournament-info.css"],
})
export class TournamentInfo {
    @Input() teamsCount: number = 16;
    @Input() startDate: string = "03.04.2025";
    @Input() endDate: string = "10.04.2025";
}
