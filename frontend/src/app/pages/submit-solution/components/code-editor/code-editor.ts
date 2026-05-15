import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-code-editor",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./code-editor.html",
    styleUrls: ["./code-editor.css"],
})
export class CodeEditor implements OnInit {
    @Output() submitted = new EventEmitter<string>();

    code: string = "";

    get lineCount(): number {
        return this.code.split("\n").length;
    }

    get charCount(): number {
        return this.code.length;
    }

    ngOnInit() {
        const saved = localStorage.getItem("solution");
        if (saved) this.code = saved;
    }

    saveToLocal() {
        localStorage.setItem("solution", this.code);
    }

    onSubmit() {
        if (this.code.trim()) {
            this.saveToLocal();
            this.submitted.emit(this.code);
        } else {
            alert("Please write your solution before submitting!");
        }
    }

    loadExample() {
        this.code = `function solveTournament(teams) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  return {
    winner: sorted[0].name,
    score: sorted[0].score
  };
}`;
        this.saveToLocal();
    }

    clearCode() {
        this.code = "";
        localStorage.removeItem("solution");
    }
}
