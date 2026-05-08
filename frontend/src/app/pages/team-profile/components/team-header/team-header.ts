import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-header.html',
  styleUrls: ['./team-header.css']
})
export class TeamHeader {
  @Input() teamName = '';
  @Input() teamLogo = '';
  @Input() teamDescription = '';
  @Output() editProfile = new EventEmitter<void>();
}