import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-search-info",
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: "./search-info.html",
    styleUrls: ["./search-info.css"],
})
export class SearchInfo {
    searchQuery = "";
    searched = false;
    searchResults: { name: string; type: string }[] = [];

    private data = [
        { name: "Code-Arena 2025", type: "Tournament" },
        { name: "Summer Challenge", type: "Tournament" },
        { name: "Winter Cup", type: "Tournament" },
        { name: "Alpha Team", type: "Team" },
        { name: "Beta Squad", type: "Team" },
        { name: "Gamma Force", type: "Team" },
        { name: "Timofey", type: "User" },
        { name: "VouPrchakero3000", type: "User" },
        { name: "Niksulini", type: "User" },
    ];

    onSearch() {
        this.searched = true;
        if (!this.searchQuery.trim()) {
            this.searchResults = [];
            return;
        }
        const query = this.searchQuery.toLowerCase();
        this.searchResults = this.data.filter(item => item.name.toLowerCase().includes(query));
    }
}
