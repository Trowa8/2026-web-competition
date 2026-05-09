import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-info.html',
  styleUrls: ['./search-info.css']
})
export class SearchInfo { }