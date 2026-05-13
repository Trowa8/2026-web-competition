import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './qa.html',
  styleUrls: ['./qa.css']
})
export class Qa { }