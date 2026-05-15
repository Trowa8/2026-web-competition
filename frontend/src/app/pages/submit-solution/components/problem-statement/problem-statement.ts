import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-problem-statement",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./problem-statement.html",
    styleUrls: ["./problem-statement.css"],
})
export class ProblemStatement {
    problemText = `Write a function that takes an array of teams with their scores and returns the winner.

Input: [{ name: "Alpha", score: 67 }, { name: "Beta", score: 42 }]
Output: { winner: "Alpha", score: 67 }`;
}
