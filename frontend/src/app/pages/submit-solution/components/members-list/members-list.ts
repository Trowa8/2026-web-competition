import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './members-list.html',
  styleUrls: ['./members-list.css']
})
export class MembersList {
  members = ['VouPrchakero3000', 'Niksulini', 'Stipek'];
}