import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-tournament.html',
  styleUrls: ['./create-tournament.css']
})
export class CreateTournamentComponent {
  tournamentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['Public', Validators.required],
      date: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.tournamentForm.valid) {
      console.log('Дані турніру:', this.tournamentForm.value);
      alert(`Турнір "${this.tournamentForm.value.name}" успішно створено!`);
      this.router.navigate(['/tasks']);
    } else {
      alert('Будь ласка, заповніть усі обов’язкові поля.');
    }
  }
}