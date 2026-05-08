import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solution-info.html',
  styleUrls: ['./solution-info.css']
})
export class SolutionInfo {
  @Input() solution: any;
}