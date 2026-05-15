import { Component, Input } from "@angular/core";
import { TournamentListItemType } from "../../../../shared/types/tournament.types";

@Component({
    selector: "app-tournament-table",
    standalone: true,
    templateUrl: "./tournament-table.html",
    styleUrls: ["./tournament-table.css"],
})
export class TournamentTable {
    @Input() tournaments: TournamentListItemType[] = [];
}
