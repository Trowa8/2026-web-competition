import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournament.html',
  styleUrls: ['./tournament.css']
})
export class Tournament {
  onSignUp() {
    alert('✅ You have successfully registered for the tournament!');
  }
}